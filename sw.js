self.addEventListener("message", async e => {
  const clients = await self.clients.matchAll()
  clients.forEach(function (client) {
    client.postMessage(e.data)
  })
})
