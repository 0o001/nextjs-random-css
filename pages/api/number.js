// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  function getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
  }
  
  const query = req.query;
  
  let ranges = query.range.split(',');
  
  let css = '';
  for(let i = 0; i < query.count; i++) {
    let random;
     
    if(ranges.length > 1)
      random = getRandom(ranges[0], ranges[1]);
    else
      random = getRandom(0, ranges[0]);
    
    css += `--${query.name}-${i}:${random};`;
    
  }
  
  res.setHeader('Content-Type', 'text/css');
  res.write(`:root{${css}}`);
  res.end();
}
