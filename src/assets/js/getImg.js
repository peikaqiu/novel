export function

getimg(val) {
  let record = decodeURIComponent(val.slice(7))
  return record
}

export function
setLink(val){
  let record = encodeURIComponent(val)
  return record
}

