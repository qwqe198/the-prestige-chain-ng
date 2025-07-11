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
       if(hasMilestone("b",2)) mult = mult.mul(2)
	if(hasMilestone("b",4))mult = mult.mul(player.a.points.add(10).log10())
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

    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "a", description: "a: 进行变形虫重置", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
  
   
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
      if(player.b.points.gte(6))gain= new Decimal(1e308)
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
            effectDescription: "当前残局",
            done() { return player.b.points.gte(6) }
        },                                              
       },

    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "b", description: "b: 进行b-y重置", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return player.a.points.gte(1)||hasMilestone("b",2) }
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
            done() { return player.b.points.gte(25)},
            unlocked(){return player.b.points.gte(25)},      
        },

    },
   

    row: 2, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "z", description: "z: 进行z重置", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return player.b.points.gte(25)}
})
