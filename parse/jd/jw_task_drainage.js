const Template = require('../../template');

class Main extends Template {
    constructor() {
        super()
        this.title = "京东天天来赚钱"
        this.cron = "6 6,20 * * *"
        this.help = 2
        this.task = 'local'
        this.import = ['jdAlgo']
    }

    async prepare() {
        this.algo = new this.modules.jdAlgo()
        this.algo.set({
            'appId': '60d61',
            'type': 'wechat',
        })
    }

    async main(p) {
        let cookie = `buildtime=20230103;wxapp_type=1;wxapp_version=8.13.30;wxapp_scene=1112;cid=5;pinStatus=4; ${p.cookie}`
        let s = await this.algo.curl({
                'url': `https://api.m.jd.com/MiniTask_ChannelPage?g_ty=ls&g_tk=1629788202`,
                'form': `functionId=MiniTask_ChannelPage&t=1662909377667&body=%7B%7D&appid=hot_channel&loginType=11&clientType=wxapp&client=apple&clientVersion=7.21.80&build=&osVersion=iOS%2011.4&screen=320*568&networkType=4g&d_brand=iPhone&d_model=iPhone%20SE%3CiPhone8%2C4%3E&d_name=&lang=zh_CN`,
                cookie,
                referer: "https://servicewechat.com/wx91d27dbf599dff74/654/page-frame.html",
                "user-agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 11_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15F79 MicroMessenger/8.0.15(0x18000f2e) NetType/4G Language/zh_CN"
            }
        )
        let report = await this.curl({
                'url': `https://api.m.jd.com/wechat/drainage/visitReport?g_ty=ls&g_tk=133291722`,
                'form': `functionId=WechatDrainage_visitReport&appid=hot_channel&loginType=2`,
                cookie,
                referer: "https://servicewechat.com/wx91d27dbf599dff74/654/page-frame.html",
                "user-agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.27(0x18001b35) NetType/WIFI Language/zh_CN",
            }
        )
        let sign = await this.algo.curl({
                'url': `https://api.m.jd.com/mini_doSign?g_ty=ls&g_tk=1629788202`,
                'form': `functionId=mini_doSign&t=1662909416431&body={"itemId":"1"}&appid=hot_channel&loginType=11&clientType=wxapp&client=apple&clientVersion=7.21.80&build=&osVersion=iOS%2011.4&screen=320*568&networkType=4g&d_brand=iPhone&d_model=iPhone%20SE%3CiPhone8%2C4%3E&d_name=&lang=zh_CN`,
                cookie,
                referer: "https://servicewechat.com/wx91d27dbf599dff74/654/page-frame.html",
                "user-agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 11_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15F79 MicroMessenger/8.0.15(0x18000f2e) NetType/4G Language/zh_CN"
            }
        )
        console.log("签到:", this.haskey(sign, 'message') || sign)
        for (let i of this.haskey(s, 'data.scanTaskList')) {
            if (i.status != 2) {
                console.log(`正在浏览: ${i.title}`)
                let a = await this.algo.curl({
                        'url': `https://api.m.jd.com/MiniTask_ScanTask?g_ty=ls&g_tk=1629788202`,
                        'form': `functionId=MiniTask_ScanTask&t=1662910469624&body={"actionType":1,"scanAssignmentId":"${i.scanAssignmentId}","itemId":"${i.itemId}"}&appid=hot_channel&loginType=11&clientType=wxapp&client=apple&clientVersion=7.21.80&build=&osVersion=iOS%2011.4&screen=320*568&networkType=4g&d_brand=iPhone&d_model=iPhone%20SE%3CiPhone8%2C4%3E&d_name=&lang=zh_CN`,
                        cookie,
                        referer: "https://servicewechat.com/wx91d27dbf599dff74/654/page-frame.html",
                        "user-agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 11_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15F79 MicroMessenger/8.0.15(0x18000f2e) NetType/4G Language/zh_CN"
                    }
                )
                await this.wait(i.times * 1000)
                let b = await this.algo.curl({
                        'url': `https://api.m.jd.com/MiniTask_ScanTask?g_ty=ls&g_tk=1629788202`,
                        'form': `functionId=MiniTask_ScanTask&t=1662910469624&body={"actionType":0,"scanAssignmentId":"${i.scanAssignmentId}","itemId":"${i.itemId}"}&appid=hot_channel&loginType=11&clientType=wxapp&client=apple&clientVersion=7.21.80&build=&osVersion=iOS%2011.4&screen=320*568&networkType=4g&d_brand=iPhone&d_model=iPhone%20SE%3CiPhone8%2C4%3E&d_name=&lang=zh_CN`,
                        cookie,
                        referer: "https://servicewechat.com/wx91d27dbf599dff74/654/page-frame.html",
                        "user-agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 11_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15F79 MicroMessenger/8.0.15(0x18000f2e) NetType/4G Language/zh_CN"
                    }
                )
                let c = await this.algo.curl({
                        'url': `https://api.m.jd.com/MiniTask_ScanReward?g_ty=ls&g_tk=1629788202`,
                        'form': `functionId=MiniTask_ScanReward&t=1662910991724&body={"scanAssignmentId":"${i.scanAssignmentId}"}&appid=hot_channel&loginType=11&clientType=wxapp&client=apple&clientVersion=7.21.80&build=&osVersion=iOS%2011.4&screen=320*568&networkType=4g&d_brand=iPhone&d_model=iPhone%20SE%3CiPhone8%2C4%3E&d_name=&lang=zh_CN`,
                        cookie,
                        referer: "https://servicewechat.com/wx91d27dbf599dff74/654/page-frame.html",
                        "user-agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 11_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15F79 MicroMessenger/8.0.15(0x18000f2e) NetType/4G Language/zh_CN"
                    }
                )
                console.log(c.data)
            }
            else {
                console.log(`任务已完成: ${i.title}`)
            }
        }
        cookie = `buildtime=20230105;wxapp_type=1;wxapp_version=8.13.50;wxapp_scene=1019;cid=5;${p.cookie}`
        let drainage = await this.algo.curl({
                'url': `https://api.m.jd.com/MiniTask_ChannelPage?g_ty=ls&g_tk=1871805617`,
                'form': `functionId=MiniTask_ChannelPage&t=1673015432276&body=%7B%22source%22%3A%22task%22%7D&appid=hot_channel&loginType=11&clientType=wxapp&client=apple&clientVersion=8.13.30&build=&osVersion=iOS%2015.1.1&screen=390*844&networkType=wifi&d_brand=iPhone&d_model=iPhone%2012%20Pro%3CiPhone13%2C3%3E&d_name=&lang=zh_CN`,
                cookie,
                referer: "https://servicewechat.com/wx91d27dbf599dff74/681/page-frame.html",
                "user-agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 11_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15F79 MicroMessenger/8.0.15(0x18000f2e) NetType/4G Language/zh_CN"
            }
        )
        let drainageTask = await this.algo.curl({
                'url': `https://api.m.jd.com/miniTask_getDrainageTaskReward?g_ty=ls&g_tk=133291722`,
                'form': `functionId=miniTask_getDrainageTaskReward&t=1662912449738&body={"rewardAssignmentId":"${s.data.drainageTask.rewardAssignmentId}"}&appid=hot_channel&loginType=11&clientType=wxapp&client=apple&clientVersion=7.21.80&build=&osVersion=iOS%2013.7&screen=375*667&networkType=wifi&d_brand=iPhone&d_model=iPhone%206s%3CiPhone8%2C1%3E&d_name=&lang=zh_CN&_ste=2`,
                cookie,
                referer: "https://servicewechat.com/wx91d27dbf599dff74/681/page-frame.html",
                headers: {
                    wqreferer: "http://wq.jd.com/wxapp/pages/marketing/entry_task/index"
                },
                "user-agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 11_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15F79 MicroMessenger/8.0.15(0x18000f2e) NetType/4G Language/zh_CN"
            }
        )
        console.log("引流:", this.haskey(drainageTask, 'message') || drainageTask)
        if (this.haskey(drainage, 'data.point')) {
            console.log(`签到天数: ${drainage.data.signInfo.signDays}\n现有金币: ${drainage.data.point}`)
        }
    }
}

module.exports = Main;