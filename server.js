const {parse}=require('csv-parse'); 
const fs=require('fs');
const crypto=require('crypto');
const {csvAppend}=require('csv-append');

//hasher function
function sha256Hasher(input){
    const hash = crypto.createHash('sha256').update(input).digest('hex');
    return hash;    
}
let newJson=[];
const result=[];
//converting to csv file  using nodejs built-in fs module
fs.createReadStream('NFT Naming csv - All Teams.csv')
.pipe(parse({
    columns:true,
}))
.on('data',(data)=>{
    result.push(data)
})
.on('error',(err)=>{
    console.log(err) 
})
.on('end',(data)=>{
    //hashing to sha256 and pushing to array newJson
  result.map((src,i)=>{
    let hash=sha256Hasher(JSON.stringify(src));
    newJson.push({
        ...src,
        hash
    })
    console.log(newJson)
  })
  const RELATIVE_PATH_TO_CSV='output.csv';
  const{append,end}=csvAppend(RELATIVE_PATH_TO_CSV);
  append(newJson);

})



