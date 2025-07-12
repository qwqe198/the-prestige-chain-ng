addLayer("a", {
    name: "变形虫", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "a", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#00FF00",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "变形虫", // Name of prestige currency
    baseResource: "点数", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal:膨胀资源层 static: 非膨胀资源层 使用时要加双引号
    exponent: 0.5, // Prestige currency exponent 初始值0.5
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
if(hasMilestone("b",18)) mult = mult.add(1)
       if(hasMilestone("b",2)) mult = mult.mul(2)
	if(hasMilestone("b",4))mult = mult.mul(player.a.points.add(10).log10())
if(hasMilestone("b",7)) mult = mult.mul(player.a.upgrades.length+1)
if(hasMilestone("b",10)) mult = mult.mul(player.a.milestones.length+1)
if(hasMilestone("b",12)) mult = mult.mul(player.points.add(10).log10())
if(hasMilestone("b",14)) mult = mult.mul(1.05**player.b.milestones.length)
if(hasMilestone("b",17)) mult = mult.mul(getBuyableAmount("a",11).add(1))
if(hasMilestone("b",24)) mult = mult.mul(hasChallenge("a",11)?2:1)
if(hasMilestone("b",20)) mult = mult.pow(1.01)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
        upgrades: {
        11: {
            description: "变形虫加成点数.",
  effect(){
                var eff = player.a.points.add(1).pow(0.5)

                return eff
            },
            effectDisplay(){return `x ${format(this.effect())}`},
            cost:new Decimal(2),
                       unlocked(){return hasMilestone("b",5)},
           
        },

   },
              buyables:{
            11: {
                cost(x = getBuyableAmount(this.layer, this.id)) {
                    var c = new Decimal(10000).mul(new Decimal(10).pow(x))
                  
                    return c
                },
                display() { return `点数获取x${format(buyableEffect(this.layer,this.id),2)}.(下一级: ${format(this.effect(getBuyableAmount(this.layer, this.id).add(1)))})<br />费用:${format(this.cost(getBuyableAmount(this.layer, this.id)))}变形虫<br>等级:${formatWhole(getBuyableAmount(this.layer, this.id))}` },
                canAfford() { return player.a.points.gte(this.cost()) },
                buy() {
                    player.a.points = player.a.points.sub(this.cost())
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                },
               
                effect(x = getBuyableAmount(this.layer, this.id)){
                    var eff = x.add(1)
                  
                    return eff
                },
                unlocked(){return hasMilestone("b",15)},
            },
  
       },
 milestones: {
        1: {
            requirementDescription: "100变形虫",
            effectDescription: "点数获取+1",
            done() { return player.a.points.gte(100) },
unlocked(){return player.b.points.gte(8)},
        },
},                 
    row: 0, // Row the layer is in on the tree (0 is the first row)
     challenges: {
        11: {
                name: "点数减少",
                challengeDescription(){


                        let a = "点数获取/2026" 

                        return a 
                },
                goalDescription(){
                        return "2026点数"
                },
                challengeEffect(){
                        let eff =1
                    

                        return eff
                },
                goal: () => "2026",
                canComplete: () => player.points.gte(tmp.a.challenges[11].goal),
                rewardDescription(){
                       
                       
                        let b = "点数获取x04.01" 
                       
                        return  b
                },
                
                rewardEffect(){let eff=1

                        return eff
                },
                unlocked(){
                        return hasMilestone("b", 22) 
                },
               
        },}, // inChallenge("l", 11)
   
 passiveGeneration(){
        if(hasMilestone("b",21)) return '0.001'
        return 0
    },
    layerShown(){return true},
   tabFormat: {
        main: {
            buttonStyle() {return  {'color': 'lightblue'}},
            content:
                ["main-display",
              
 ["prestige-button", "", function (){ return hasMilestone("b", 21) ? {'display': 'none'} : {}}],
"resource-display",
"milestones",
"buyables",
                "upgrades",
 "challenges",
                ],},
     
   

      
    },
   
})
addLayer("b", {
    name() {return player.b.points.gte(25)?"z":player.b.points.gte(24)?"y":player.b.points.gte(23)?"x":player.b.points.gte(22)?"w":player.b.points.gte(21)?"v":player.b.points.gte(20)?"u":player.b.points.gte(19)?"t":player.b.points.gte(18)?"s":player.b.points.gte(17)?"r":player.b.points.gte(16)?"q":player.b.points.gte(15)?"p":player.b.points.gte(14)?"o":player.b.points.gte(13)?"n":player.b.points.gte(12)?"m":player.b.points.gte(11)?"l":player.b.points.gte(10)?"k":player.b.points.gte(9)?"j":player.b.points.gte(8)?"i":player.b.points.gte(7)?"h":player.b.points.gte(6)?"g":player.b.points.gte(5)?"f":player.b.points.gte(4)?"e":player.b.points.gte(3)?"d":player.b.points.gte(2)?"c":"b" },// This is optional, only used in a few places, If absent it just uses the layer id.
    symbol() {return player.b.points.gte(25)?"z":player.b.points.gte(24)?"y":player.b.points.gte(23)?"x":player.b.points.gte(22)?"w":player.b.points.gte(21)?"v":player.b.points.gte(20)?"u":player.b.points.gte(19)?"t":player.b.points.gte(18)?"s":player.b.points.gte(17)?"r":player.b.points.gte(16)?"q":player.b.points.gte(15)?"p":player.b.points.gte(14)?"o":player.b.points.gte(13)?"n":player.b.points.gte(12)?"m":player.b.points.gte(11)?"l":player.b.points.gte(10)?"k":player.b.points.gte(9)?"j":player.b.points.gte(8)?"i":player.b.points.gte(7)?"h":player.b.points.gte(6)?"g":player.b.points.gte(5)?"f":player.b.points.gte(4)?"e":player.b.points.gte(3)?"d":player.b.points.gte(2)?"c":"b"}, // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#fbc618",
    requires: new Decimal(1), // Can be a function that takes requirement increases into account
    resource(){return player.b.points.gte(25)?"z":player.b.points.gte(24)?"y":player.b.points.gte(23)?"x":player.b.points.gte(22)?"w":player.b.points.gte(21)?"v":player.b.points.gte(20)?"u":player.b.points.gte(19)?"t":player.b.points.gte(18)?"s":player.b.points.gte(17)?"r":player.b.points.gte(16)?"q":player.b.points.gte(15)?"p":player.b.points.gte(14)?"o":player.b.points.gte(13)?"n":player.b.points.gte(12)?"m":player.b.points.gte(11)?"l":player.b.points.gte(10)?"k":player.b.points.gte(9)?"j":player.b.points.gte(8)?"i":player.b.points.gte(7)?"h":player.b.points.gte(6)?"g":player.b.points.gte(5)?"f":player.b.points.gte(4)?"e":player.b.points.gte(3)?"d":player.b.points.gte(2)?"c":"b"}, // Name of prestige currency
    baseResource: "变形虫", // Name of resource prestige is based on
    baseAmount() {return player.a.points}, // Get the current amount of baseResource
    type: "static", // normal:膨胀资源层 static: 非膨胀资源层 使用时要加双引号
    exponent: 1, // Prestige currency exponent 初始值0.5
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
       
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
  getNextAt(){
        let gain = new Decimal(2).pow(player.b.points)

        return gain
},
    milestones: {
        1: {
            requirementDescription: "1b",
            effectDescription: "点数获取x2",
            done() { return player.b.points.gte(1) }
        },
        2: {
            requirementDescription: "2c",
            effectDescription: "变形虫获取x2",
            done() { return player.b.points.gte(2) }
        },
  3: {
            requirementDescription: "3d",
            effectDescription(){return  "点数获取基于点数增加,当前:x" + format(player.points.add(10).log10())},
            done() { return player.b.points.gte(3) }
        },
     4: {
            requirementDescription: "4e",
            effectDescription(){return  "变形虫获取基于变形虫增加,当前:x" + format(player.a.points.add(10).log10())},
            done() { return player.b.points.gte(4) }
        }, 
5: {
            requirementDescription: "5f",
            effectDescription: "解锁一个升级",
            done() { return player.b.points.gte(5) }
        },     
6: {
            requirementDescription: "6g",
            effectDescription(){return  "购买变形虫升级数量加成点数获取,当前:x" + format(player.a.upgrades.length+1)},
            done() { return player.b.points.gte(6) }
        }, 
 7: {
            requirementDescription: "7h",
            effectDescription(){return  "购买变形虫升级数量加成变形虫获取,当前:x" + format(player.a.upgrades.length+1)},
            done() { return player.b.points.gte(7) }
        },  
8: {
            requirementDescription: "8i",
            effectDescription: "解锁一个里程碑",
            done() { return player.b.points.gte(8) }
        },   
         9: {
            requirementDescription: "9j",
            effectDescription(){return  "变形虫里程碑数量加成点数获取,当前:x" + format(player.a.milestones.length+1)},
            done() { return player.b.points.gte(9) }
        }, 
 10: {
            requirementDescription: "10k",
            effectDescription(){return  "变形虫里程碑数量加成变形虫获取,当前:x" + format(player.a.milestones.length+1)},
            done() { return player.b.points.gte(10) }
        }, 
     11: {
            requirementDescription: "11l",
            effectDescription(){return  "点数获取基于变形虫增加,当前:x" + format(player.a.points.add(10).log10())},
            done() { return player.b.points.gte(11) }
        },   
12: {
            requirementDescription: "12m",
            effectDescription(){return  "变形虫获取基于点数增加,当前:x" + format(player.points.add(10).log10())},
            done() { return player.b.points.gte(12) }
        }, 
 13: {
            requirementDescription: "13n",
            effectDescription(){return  "该层级每个里程碑使点数x1.05,当前:x" + format(1.05**player.b.milestones.length)},
            done() { return player.b.points.gte(13) }
        },
    14: {
            requirementDescription: "14o",
            effectDescription(){return  "该层级每个里程碑使变形虫x1.05,当前:x" + format(1.05**player.b.milestones.length)},
            done() { return player.b.points.gte(14) }
        },
    15: {
            requirementDescription: "15p",
            effectDescription: "解锁一个可购买",
            done() { return player.b.points.gte(15) }
        },
       16: {
            requirementDescription: "16q",
            effectDescription(){return  "变形虫可购买数量加成点数获取,当前:x" + format(getBuyableAmount("a",11).add(1))},
            done() { return player.b.points.gte(16) }
        }, 
       17: {
            requirementDescription: "17r",
            effectDescription(){return  "变形虫可购买数量加成变形虫获取,当前:x" + format(getBuyableAmount("a",11).add(1))},
            done() { return player.b.points.gte(17) }
        }, 
  18: {
            requirementDescription: "18s",
            effectDescription(){return  "变形虫获取+1"},
            done() { return player.b.points.gte(18) }
        }, 
19: {
            requirementDescription: "19t",
            effectDescription(){return  "点数获取^1.01"},
            done() { return player.b.points.gte(19) }
        }, 
20: {
            requirementDescription: "20u",
            effectDescription(){return  "变形虫获取^1.01"},
            done() { return player.b.points.gte(20) }
        },
21: {
            requirementDescription: "21v",
            effectDescription(){return  "每秒自动获取0.1%的变形虫,禁用变形虫重置"},
            done() { return player.b.points.gte(21) }
        },
    22: {
            requirementDescription: "22w",
            effectDescription: "解锁一个挑战",
            done() { return player.b.points.gte(22) }
        },
  23: {
            requirementDescription: "23x",
            effectDescription(){return  "完成变形虫挑战数量加成点数获取,当前:x" + format(hasChallenge("a",11)?2:1)},
            done() { return player.b.points.gte(23) }
        }, 
       24: {
            requirementDescription: "24y",
            effectDescription(){return  "完成变形虫挑战数量加成变形虫获取,当前:x" + format(hasChallenge("a",11)?2:1)},
            done() { return player.b.points.gte(24) }
        },
        25: {
            requirementDescription: "25z",
            effectDescription(){return  "解锁新层级"},
            done() { return player.b.points.gte(25) }
        }, 
       },

    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "b", description: "b: 进行b-y重置", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return player.a.points.gte(1)||hasMilestone("b",1) }
})
addLayer("z", {
    name: "z", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "z", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#1f1e33",
    requires: new Decimal(25), // Can be a function that takes requirement increases into account
    resource: "z", // Name of prestige currency
    baseResource: "b", // Name of resource prestige is based on
    baseAmount() {return player.b.points}, // Get the current amount of baseResource
    type: "static", // normal:膨胀资源层 static: 非膨胀资源层 使用时要加双引号
    exponent: 1, // Prestige currency exponent 初始值0.5
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
       
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    milestones: {
        0: {
            requirementDescription: "恭喜通关",
            effectDescription: "2026愚人节快乐",
            done() { return player.z.points.gte(1)},
            unlocked(){return player.z.points.gte(1)},      
        },

    },
   

    row: 2, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "z", description: "z: 进行z重置", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return player.b.points.gte(25)}
})
