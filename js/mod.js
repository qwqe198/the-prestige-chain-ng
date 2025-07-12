let modInfo = {
	name: "巅峰锁链重生",
	id: "2026yrj",
	author: "Designant",
	pointsName: "点数",
	modFiles: ["layers.js", "tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (0), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.0",
	name: "",
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>v0.0</h3><br>
		- Added Level.`

let winText = `Congratulations! 你有 reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
let gain = new Decimal(1)
if(hasMilestone("a",1)) gain = gain.add(1)
	if(hasMilestone("b",1)) gain = gain.mul(2)
	if(hasMilestone("b",3)) gain = gain.mul(player.points.add(10).log10())
	if(hasMilestone("b",6)) gain = gain.mul(player.a.upgrades.length+1)
if(hasMilestone("b",9)) gain = gain.mul(player.a.milestones.length+1)
if(hasMilestone("b",11)) gain = gain.mul(player.a.points.add(10).log10())
if(hasMilestone("b",13)) gain = gain.mul(1.05**player.b.milestones.length)
if(hasMilestone("b",16)) gain = gain.mul(getBuyableAmount("a",11).add(1))
gain = gain.mul(buyableEffect("a",11))
	if(hasUpgrade("a",11)) gain = gain.mul(upgradeEffect("a",11))
if(hasMilestone("b",23)) gain = gain.mul(hasChallenge("a",11)?2:1)
	if(hasChallenge("a",11))		gain = gain.mul(4.01)
if(hasMilestone("b",19)) gain = gain.pow(1.01)

	if(inChallenge("a",11))		gain = gain.div(2026)

	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
]

// Determines when the game "ends"
function isEndgame() {
	
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if 你有 things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}