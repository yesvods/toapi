module.exports = `
filter fstr() {
  return this.replace(/\\//g, '').trim()
}

filter fp() {
  return this.replace(/\\n/g, '').trim()
}

.job_company@company {
  .fl{find($name|fp, '拉勾认证企业')}
  .c_feature li:nth-child(1){find($domain|fp, '领域')}
  .c_feature li:nth-child(2){find($stage|fp, '发展阶段')}
  .c_feature li:nth-child(3){find($size|fp, '规模')}
  .c_feature li:nth-child(4) a[href=$link];
}

.position-content-l@jobDetail {
  .job-name[title=$title];
  .job_request@request|pack {
    span:nth-child(1) {$sal|fstr|replace(/k/g, '')|split('-')}
    span:nth-child(2) {$loc|fstr}
    span:nth-child(3) {$exp|fstr}
    span:nth-child(4) {$edu|fstr}
    span:nth-child(5) {$type|fstr}
  };
  .position-label li@tags {&{$}};
}
.job_bt div p@desc {
  &{$|fp}
}
.work_addr@addr|join('')|replace(/\\s/g, '') {
  &{find($|fp, '查看地图')}
}
`