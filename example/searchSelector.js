module.exports = `
filter flast() {
  var list = this.split('\\n').map(f => f.trim()).filter(f => f)
  return list[list.length-1]
}
filter filterEmpty(attr){
  return this.filter(x => x[attr])
}

#s_position_list ul li@list|filterEmpty('jobName') {
  h3 {$jobName}
  span.add {$addr}
  span.format-time {$publishTime}
  .hr_name[value=$hrName];
  .target_position[value=$jobId];
  .money {$money}
  .li_b_l {$exp|flast}
  .company_name a {$companyName}
  .li_b_l span@tags {&{$}}
  .li_b_r {$intro}
  .com_logo img[src=$logo];
}
`
