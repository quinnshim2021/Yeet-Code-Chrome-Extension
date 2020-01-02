// todo: cross reference with github list

// original list here http://www.learn4master.com/interview-questions/leetcode/leetcode-problems-classified-by-company
// cross reference with this list https://github.com/rrevanth/leetcode-by-company

console.log('content script running') // show that script is running
let companyDict = {
    LinkedIn: [1,21,23,33,34, 46, 47, 50, 53, 56, 57, 65, 68, 76, 101, 102, 103, 104, 127, 149, 150, 152, 156, 170, 173, 187, 198, 205, 236, 238, 243,244,245,254,256,277,297,311,339],
    Google: [10,17, 20, 22, 23, 31, 42, 44, 50, 54, 56, 57, 66, 128, 133, 139, 140, 146, 155, 158, 159, 162, 163, 166, 173, 200, 208, 212, 214, 218, 224, 228, 230, 231, 239, 240, 246, 247, 249, 251, 253, 257, 259, 261, 266, 269, 270, 271, 272, 274, 276, 279, 280, 281, 282, 284, 286, 288, 289, 293, 294, 295, 297, 298, 302, 305, 308, 309, 310, 312, 313, 314, 315, 316, 317, 318, 320, 321, 323, 324, 326, 327, 329, 331, 332, 336, 340, 341],
    Adobe: [1, 2, 3, 4, 15, 70, 169, 195, 206, 237, 258, 292],
    Palantir: [136, 146, 217, 219, 220, 303, 325],
    Yelp: [1, 3, 14, 49, 56, 126, 127, 151, 206, 207, 218, 242],
    Uber: [1, 8, 10, 13, 17, 22, 23, 24, 33, 36, 37, 39, 49, 54, 76, 78, 91, 104, 121, 125, 133, 138, 139, 140, 146, 155, 161, 171, 186, 202, 206, 208, 230, 242, 249, 254, 262, 266, 290, 291, 297, 337],  
    Airbnb: [1, 2, 10, 20, 23, 68, 108, 136, 160, 190, 198, 202, 212, 217, 219, 220, 221, 251, 269, 336],
    Yahoo: [1, 4, 13, 104, 139, 141, 146, 206, 217, 284, 297],
    Dropbox: [ 1, 4, 17, 140, 289, 290, 291],
    Snapchat: [ 36, 39, 44, 96, 127, 140, 146, 151, 155, 161, 206, 269, 270, 289, 314],
    Zenefit: [4, 20, 22, 42, 52, 109, 125, 146, 155, 168, 169, 200, 206, 207, 210, 229, 239, 251, 255, 261, 317],
    Twitter: [10, 12, 20, 23, 42, 43, 56, 60, 118, 140, 146, 149, 161, 202, 206, 208, 218, 235, 251, 269, 296],
    Facebook: [1, 10, 13, 15, 17, 20, 23, 25, 26, 28, 33, 38, 43, 44, 49, 50, 56, 57, 67, 69, 71, 75, 76, 78, 79, 80, 85, 88, 90, 91, 98, 102, 117, 121, 125, 127, 128, 133, 139, 146, 157, 158, 161, 168, 173, 200, 206, 208, 209, 210, 211, 215, 218, 221, 234, 235, 236, 238, 252, 253, 257, 261, 265, 269, 273, 274, 275, 277, 278, 282, 283, 285, 286, 297, 301, 311, 314, 325, 334],
    Amazon: [1, 2, 3, 5, 8, 15, 17, 20, 21, 23, 42, 48, 49, 78, 89, 98, 102, 121, 126, 127, 138, 139, 141, 146, 155, 160, 167, 186, 199, 200, 204, 206, 215, 234, 235, 236, 238, 239, 240, 242, 297],
    Microsoft: [1, 2, 4, 5, 8, 13, 15, 20, 21, 23, 24, 25, 26, 28, 33, 46, 47, 48, 53, 54, 55, 56, 71, 73, 75, 79, 88, 91, 94, 98, 101, 102, 103, 106, 112, 114, 116, 117, 121, 124, 125, 138, 141, 146, 151, 153, 160, 162, 165, 168, 171, 173, 174, 186, 189, 191, 200, 204, 206, 208, 212, 213, 215, 218, 232, 235, 236, 237, 238, 258, 268, 270, 273, 285, 297, 300, 333],
    Apple: [1, 4, 7, 21, 28, 36, 42, 48, 69, 70, 102, 104, 118, 149, 151, 165, 190, 191, 206, 207, 215, 221, 236, 237, 238, 240, 257, 284],
    Bloomberg: [1, 2, 3, 5, 7, 8, 11, 13, 14, 15, 20, 24, 26, 33, 42, 49, 50, 53, 56, 62, 63, 69, 79, 88, 98, 100, 101, 102, 103, 105, 110, 113, 117, 121, 122, 131, 138, 139, 141, 146, 151, 155, 158, 160, 172, 189, 206, 208, 215, 225, 230, 232, 268, 274, 287, 297]
}
chrome.runtime.onMessage.addListener(handleMessage) // receive message from background to run handleMessage

function handleMessage(request, sender, sendResponse){
    console.log("Yeet Code is " + (request.status === "Off" ? "On" : "Off"))
    if (request.status === "Off") { // if message says to run content script
        let tbody = document.getElementsByClassName('reactable-data');
        let trs = tbody[0].getElementsByTagName("tr")
        document.getElementsByClassName("reactable-th-question_id reactable-header-sortable")[0].textContent = "#/Company"
        for (tr of trs) {
            if (tr.textContent !== "") { // need because some tr's are spaces
                let questionNumber = parseInt(tr.textContent.match(/[a-zA-Z]+|[0-9]+/g)[0]) // gets only the number of the q
                for (var key in companyDict) { // for each company in the dictionary
                    if (companyDict[key].includes(questionNumber)){ // if the question number is in the company
                        tr.getElementsByTagName('td')[1].textContent += ", " + key
                        tr.style["background"] = "yellow"
                        tr.style["border"] = "1px solid black"
                    }
                }
            }
        }
        chrome.runtime.sendMessage({"status": "On"});
    }
    else {
        // revert styles back
        let tbody = document.getElementsByClassName('reactable-data');
        let trs = tbody[0].getElementsByTagName("tr")
        document.getElementsByClassName("reactable-th-question_id reactable-header-sortable")[0].textContent = "#"
        for (tr of trs) {
            if (tr.textContent !== "") { // need because some tr's are spaces
                let questionNumber = parseInt(tr.textContent.match(/[a-zA-Z]+|[0-9]+/g)[0]) // gets only the number of the q
                tr.getElementsByTagName('td')[1].textContent = questionNumber
                tr.style["background"] = "none"
                tr.style["border"] = "none"
    
            }
        }

        chrome.runtime.sendMessage({"status": "Off"});
    }
}
