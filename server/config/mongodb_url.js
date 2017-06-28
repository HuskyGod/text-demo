let url = '';
if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'test') {
    url = 'mongodb://amazon:0iptud6h9uo@www.amazonerhelp.com:27017/husky'
} else {
    url = 'mongodb://localhost:27017/husky'
}

export default url;