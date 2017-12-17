const fetch = async ({ url, waitUntil = 'domcontentloaded' }) => {
  const page = await browser.newPage()
  let content
  log.info(`Waiting Untiling page ${waitUntil}`)
  try {
    await page.goto(url, {
      timeout: 60 * 1000,
      waitUntil: [
        waitUntil,
        // 'load',
        // 'domcontentloaded',
      ],
    })
    content = await page.content()
  } catch (e) {
    log.error(`Fetch url:"${url}" error`)
    log.error(e)
    return {
      success: false,
    }
  }
  await page.close()
  return {
    success: true,
    content,
  }
}

module.exports = fetch
