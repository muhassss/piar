const { VK } = require('vk-io')

const config = {
    token: '0a69f1d005e8b1759272608e7e9726bbe5c96a456e31775796fa8a1d1c81eb7525e0ea0b416271f99db91',
    text: `[https://vk.com/app7894649#z2237|бесплатные стики]`
}

const vk = new VK({
    token: config.token
})

setInterval(() => {
    vk.api.newsfeed.search({ q: 'https://vk.me/join/', count: 1 }).then(response => {
        const str = response.items[0].text.match(/(vk.me\/join\/(\w*))/g)[0]
        const param = response.items[0]
        console.log(`successfully: Запись найдена. [id${param.id}]`)
        console.log(`successfully: Найдена ссылка, проверка...`)

        vk.api.wall.createComment({ owner_id: param.owner_id, post_id: param.id, message: config.text }).then(re => { console.log(`successfully: Оставил комментарий.`) })

        vk.api.messages.joinChatByInviteLink({ link: str }).then(response2 => {
            const chat_id = response2.chat_id

            vk.api.messages.send({ random_id: getRandomInt(0, 99999999), peer_id: 2000000000 + chat_id, message: config.text }).then(response3 => {
                console.log(`successfully: Вошел в беседу.`)
                console.log(`successfully: Сообщение отправлено.`)
            })
        }).catch (e => {
            console.error(`error: Ссылка на беседу полная хуйня.`)
        })
    })
}, 30000)

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}