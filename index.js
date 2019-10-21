const Nightmare = require('nightmare');
const tress = require('tress');

const text = `144.217.74.219:3128
51.79.25.221:8080
51.79.88.64:8080
167.99.179.88:8080
159.89.113.32:3128
165.22.231.236:3128
165.22.224.26:3128
165.22.225.56:3128
165.22.230.93:3128
167.71.105.166:3128
165.22.44.147:8080
157.245.0.154:3128
157.245.135.93:3128
165.227.185.168:8080
157.245.131.249:3128
159.203.87.130:3128
157.245.90.37:8080
167.71.182.183:3128
157.245.245.205:8080
45.77.201.234:8080
165.22.14.93:8080
159.203.44.177:3128
149.56.106.104:3128
198.98.51.240:8080
167.71.186.103:3128
206.189.176.244:8080
165.22.239.151:3128
89.187.181.123:3128
159.89.191.89:3128
167.71.165.231:8080
104.236.248.219:3128
157.245.88.191:8080
178.128.233.221:3128
167.71.182.13:3128
13.92.153.251:3128
157.245.4.19:3128
157.245.160.97:80
24.245.100.212:48678
167.71.182.191:3128
199.195.248.24:8080
198.98.58.178:8080
205.185.115.100:8080
167.71.131.143:8080
62.210.203.105:3128
167.71.142.245:8080
163.172.152.52:8811
181.225.242.98:8080
66.7.113.39:3128
163.172.147.94:8811
51.158.98.121:8811
51.158.108.135:8811
195.171.27.244:3128
51.158.106.54:8811
51.158.113.142:8811
51.158.120.84:8811
137.135.254.0:3128
186.96.73.169:999
51.158.111.242:8811
178.62.244.192:8080
163.172.162.215:8811
163.172.136.226:8811
51.158.68.26:8811
51.158.123.35:8811
40.69.35.132:3128
51.158.68.68:8811
163.172.148.62:8811
89.38.98.31:3128
163.172.189.32:8811
51.158.99.51:8811
67.75.2.39:3128
178.128.243.130:8080
37.139.11.197:3128
37.59.40.152:3128
52.157.215.147:3128
51.15.193.253:3128
206.189.106.149:8080
52.157.215.67:3128
95.179.199.155:8080
51.89.229.233:8080
51.89.228.17:8080
179.14.134.1:8083
35.197.208.210:80
80.211.250.252:8080
134.209.254.32:8080
109.128.21.7:80
78.47.202.24:3128
51.89.229.55:8080
167.71.250.73:3128
207.154.200.199:3128
35.197.217.44:80
116.203.9.48:3128
51.91.22.235:8080
191.102.106.1:8181
94.130.92.52:3128
51.158.119.88:8811
144.91.77.224:3128
144.91.77.217:3128
88.99.76.98:3128
35.235.75.244:3128
95.179.150.131:8080
108.61.123.200:8080
185.101.94.150:6969
51.158.68.133:8811
108.61.209.33:8080
80.241.210.126:3128`;

const proxies = text.split('\n');

const proxyIP = '13.92.153.251';
const proxyPORT = '3128';
const url = 'https://sfbay.craigslist.org/nby/cto/d/santa-rosa-2007-jetta-obo/7002902262.html';
const url2 = 'https://sfbay.craigslist.org/nby/cto/d/ukiah-subaru-wrx/7002876941.html';
const url3 =
  'https://sfbay.craigslist.org/eby/cto/d/berkeley-2002-ford-excursion-limited/7003144602.html';
const test = 'https://google.com';
const userAgent =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.120 Safari/537.36';

function main(job, done) {
  const { ip, port, link } = job;
  const nightmare = Nightmare({
    switches: {
      'proxy-server': ip,
    },
    // show: true,
  });
  console.count('Attempt count');
  console.log(ip);
  nightmare
    .useragent(userAgent)
    .goto(link)
    .click('.flag-action .flag')
    .wait(300)
    .evaluate(() => document.querySelector('body').classList.contains('is-flagged'))
    .end()
    .then(() => {
      console.count('Flagged count');
      done(null);
    })
    .catch(error => {
      console.log(error);
      done(null);
    });
}

const itemQue = tress((job, done) => {
  main(job, done);
}, -2000);

itemQue.drain = () => {
  console.log('flagging finished');
};

function runItem() {
  for (let i = 0; i < proxies.length; i++) {
    const ip = proxies[i];
    itemQue.push({ ip, port: '', link: url3 });
  }
}

// module.exports = runItem;

runItem();

// const r = require('request');
// const request = r.defaults({ proxy: '157.245.209.92:80' });

// const url = 'https://sfbay.craigslist.org/flag/?async=async&flagCode=28&postingID=7002901868';
// // const url = 'https://sfbay.craigslist.org/flag/?async=async&flagCode=28&postingID=7002902262';
// // const url = 'https://sfbay.craigslist.org/nby/cto/d/santa-rosa-2007-jetta-obo/7002902262.html';
// const cookieName = 'cl_b';
// const cookieVal =
//   'Mw|QjRGQUM1REUtRDMyNC0xMUU5LTgyNkEtOUM3RTQ3MDk0REFD|MTU2ODA0OTAyMg|QVM1NzI5Mw|TW96aWxsYS81LjAgKFdpbmRvd3MgTlQgMTAuMDsgV2luNjQ7IHg2NCkgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzc2LjAuMzgwOS4xMzIgU2FmYXJpLzUzNy4zNgvaYeI';

// const options = {
//   url,
//   headers: {
//     'User-Agent': userAgent,
//   },
//   jar: true,
//   timeout: 60000,
//   // proxy: '31.41.93.192',
// };

// const j = request.jar();
// const cookie = request.cookie(`${cookieName}=${cookieVal}`);
// j.setCookie(cookie, url);

// function callback(error, response, body) {
//   if (error) {
//     console.log('Error: ', error);
//     return;
//   }
//   const cookies = j.getCookies(url);
//   console.log(response.statusCode);
//   console.log(cookies);
// }

// request(options, callback);
