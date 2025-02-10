//-------------------------------------------------

// Arrays and Hashing

//-------------------------------------------------


// var isAnagram = function(s, t) {
//     var sCount = {}
//     var tCount = {}
//     var sArr = [...s];
//     var tArr = [...t];


//     for(let i = 0; i < sArr.length; i++){
//         if(!sCount.hasOwnProperty(sArr[i])){
//             sCount[sArr[i]] = 1;
//         } else {
//             sCount[sArr[i]]++;
//         }
//     }
//     for(let j = 0; j < tArr.length; j++){
//         if(!tCount.hasOwnProperty(tArr[j])){
//             tCount[tArr[j]] = 1;
//         } else {
//             tCount[tArr[j]]++;
//         }
//     }
    

//     return Object.keys(tCount).length === Object.keys(sCount).length && Object.keys(sCount).every(key => tCount.hasOwnProperty(key) && sCount[key] === tCount[key]);
    
// };

//Shorter, faster version.
// var isAnagram = function(s, t) {
//     var letterCount = {}
//     if([...s].length != [...t].length){
//         return false;
//     }
//     for(let char of s){
//         !letterCount.hasOwnProperty(char) ? letterCount[char] = 1 :  letterCount[char]++
        
//     }
//     for(let char of t){
//         !letterCount.hasOwnProperty(char) ? letterCount[char] = -1 : letterCount[char]-- 
//     }

//     return Object.values(letterCount).every(value => value == 0);
// };

//Refined Version
var isAnagram = function(s, t) {
    if (s.length !== t.length) return false;
    const letterCount = {};
    [...s].forEach(char => letterCount[char] = (letterCount[char] || 0) + 1);
    [...t].forEach(char => letterCount[char] = (letterCount[char] || 0) - 1);
    return Object.values(letterCount).every(count => count === 0);
};

console.log(isAnagram("imfearless", "lesserafim"))

console.log('----------------------------')

// Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
// You may assume that each input would have exactly one solution, and you may not use the same element twice.
// You can return the answer in any order.
// Example 1:

// Input: nums = [2,7,11,15], target = 9
// Output: [0,1]
// Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].

//Original, Bad.
var twoSum = function(nums, target) {
    var sumOfInts = {};
    for(let i = 0; i < nums.length; i++){
        if(sumOfInts[nums[i]] !== undefined) continue;
        sumOfInts[nums[i]] = [(nums[i]+nums[i+1]),i, i+1];
    }
    let key = Object.keys(sumOfInts).find(key => sumOfInts[key][0] == target);
    return key ? sumOfInts[key].slice(1, 3) : [];
};

//O(n) runtime
var twoSum = function(nums, target) {
    var sumOfInts = {}
    for(let i = 0; i < nums.length; i++){
     if(sumOfInts.hasOwnProperty(target - nums[i])){
        return [i, sumOfInts[target - nums[i]]]
     }
     sumOfInts[nums[i]] = i
    }
    return []
};

console.log(twoSum([2,7,11,15], 9))

console.log('----------------------------')

// Given an array of strings strs, group the anagrams together. You can return the answer in any order.
// An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.
// Example 1:

// Input: strs = ["eat","tea","tan","ate","nat","bat"]
// Output: [["bat"],["nat","tan"],["ate","eat","tea"]]
// Example 2:

// Input: strs = [""]
// Output: [[""]]
// Example 3:

// Input: strs = ["a"]
// Output: [["a"]]

var groupAnagrams = function(strs) {
    var groupedAnagrams = {}
    for(let i=0; i < strs.length; i++){
        let sortedWord = strs[i].split('').sort().join('');
        if(!groupedAnagrams.hasOwnProperty(sortedWord)){
            groupedAnagrams[sortedWord] = [strs[i]];
        } else {
            groupedAnagrams[sortedWord].push(strs[i]); 
        }
    }
    return Object.values(groupedAnagrams)
};


console.log(groupAnagrams(["eat","tea","tan","ate","nat","bat"]))
console.log(groupAnagrams([""]))
console.log(groupAnagrams(["a"]))

var t0 = performance.now();
var result = groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]);
var t1 = performance.now();
var runtime = (t1 - t0).toFixed(5);

// Calculate and log the difference
console.log("Call to groupAnagrams took " + runtime + " milliseconds.");

console.log('----------------------------')
// Given an integer array nums and an integer k, return the k most frequent elements. You may return the answer in any order.
// Example 1:

// Input: nums = [1,1,1,2,2,3], k = 2
// Output: [1,2]
// Example 2:

// Input: nums = [1], k = 1
// Output: [1]

var topKFrequent = function(nums, k) {
    let kFrequency = {};
    let sortedFreq = []
    for(let i = 0; i < nums.length; i++){
        if(!kFrequency.hasOwnProperty(nums[i])){
            kFrequency[nums[i]] = 1;
        } else {
            kFrequency[nums[i]]++;
        }
    }

    return Object.entries(kFrequency).sort((a, b) => b[1] - a[1]).map(pair => Number(pair[0])).slice(0, k);
};
console.log(topKFrequent([1,1,1,2,2,3], 2))

console.log("---------------------------------------")

// Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i].
// The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.
// You must write an algorithm that runs in O(n) time and without using the division operation.
// Example 1:
// Input: nums = [1,2,3,4]
// Output: [24,12,8,6]
// Example 2:

// Input: nums = [-1,1,0,-3,3]
// Output: [0,0,9,0,0]

var productExceptSelf = function(nums) { //Study this                                                           !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    let length = nums.length
    let left = Array(length)
    let right = Array(length)

    left[0] = 1
    for(let i = 1; i < length; i++){
        left[i] = nums[i-1] * left[i-1]
    }

    right[length-1] = 1;
    for(let i=length-2; i >= 0; i--){
        right[i] = nums[i+1] * right[i+1]
    }

    let answer = Array(length)
    for(let i=0; i < length; i++){
        answer[i] = left[i] * right[i]
        
    }

    return answer;
    
};

console.log(productExceptSelf([-1,1,0,-3,3]))

console.log("---------------------------------------")

var isValidSudoku = function(board) {
    // Create 9 empty objects for rows and columns
    const rows = new Array(9).fill().map(() => ({}));
    const columns = new Array(9).fill().map(() => ({}));

    // Iterate through each cell in the 9x9 board
    for(let i = 0; i < 9; i++){
        for(let j = 0; j < 9; j++){
            // Get the value of the cell
            let cell = board[i][j];
            // If the cell is not empty
            if(cell !== '.'){
                // If the value already exists in the current row or column, return false
                if(rows[i][cell] || columns[j][cell]){
                    return false;
                }
                // Mark the value as seen in the current row and column
                rows[i][cell] = true;
                columns[j][cell] = true;
            }
        }
    }
    // If no duplicate values are found in any row or column, return true
    return true;
};

console.log(isValidSudoku([
["8","3",".",".","7",".",".",".","."],
["6",".",".","1","9","5",".",".","."],
[".","9","8",".",".",".",".","6","."],
["8",".",".",".","6",".",".",".","3"],
["4",".",".","8",".","3",".",".","1"],
["7",".",".",".","2",".",".",".","6"],
[".","6",".",".",".",".","2","8","."],
[".",".",".","4","1","9",".",".","5"],
[".",".",".",".","8",".",".","7","9"]]))


console.log('---------------------')

//Design an algorithm to encode a list of strings to a single string. The encoded string is then decoded back to the original list of strings.
function encode(strs) {
    if(strs.length == 0){
        return "<empty>"
    }
    return strs.join('<|>');
}

/**
 * @param {string} str
 * @returns {string[]}
 */
function decode(str) {
    if(str === "<empty>"){
        return [];
    }
    return str.split('<|>');
}
let array = [""];
let array2 = []
console.log(encode(array));
console.log(decode(encode(array)));
console.log(encode(array2));
console.log(decode(encode(array2)));


console.log('---------------------')

var longestConsecutive = function(nums) {
    let numSet = new Set(nums);
    let maxLength = 0;

    for(let num of numSet){
        if(!numSet.has(num - 1)){
            let currentNum = num;
            let currentLength = 1;

            while(numSet.has(currentNum + 1)){
                currentNum += 1;
                currentLength += 1;
            }

            maxLength = Math.max(maxLength, currentLength);
        }
    }

    return maxLength;
};

console.log(longestConsecutive([100,4,200,1,3,2]))
console.log(longestConsecutive([0,3,7,2,5,8,4,6,0,1]))

console.log('---------------------')
var twoSum = function(nums, target) {
    
    const pairs = {}; 
    for(i = 0; i < nums.length; i++){
      var difference = target - nums[i]
      if (difference in pairs){
        return [pairs[difference], i]
      } else {
        pairs[nums[i]] = i
      }
      
    }
  };

  console.log(twoSum(3,9))

    console.log('---------------------')
    var isValid = function(s) {
        var sArr = [...s]
        var sStack = []
        var brackets = {
            '(': ')',
            '[': ']',
            '{': '}'
        }
        for(let i = 0; i < sArr.length; i++){
            if(brackets.hasOwnProperty(sArr[i])){
               sStack.push(sArr[i]) 
            } else if (sStack.length !== 0 && brackets[sStack[sStack.length-1]] == sArr[i]){
                sStack.pop()
            } else {
                return false;
            }
        }
        if(sStack.length === 0){
            return true;
        } else {
            return false;
        }
    };

    console.log(isValid("()")) //true
    console.log(isValid("()[]{}")) //true
    console.log(isValid("(]")) // false

console.log('------------------------------')


var MinStack = function() {
    this.minStack = []
    this.minVal = []
};

/** 
 * @param {number} val
 * @return {void}
 */
MinStack.prototype.push = function(val) {
    this.minStack[this.minStack.length] = val;
    if (this.minVal.length === 0 || val <= this.minVal[this.minVal.length - 1]) {
        this.minVal[this.minVal.length] = val;
    } else {
        this.minVal[this.minVal.length] = this.minVal[this.minVal.length - 1];
    }
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function() {
    if (this.minStack.length > 0) {
        this.minStack.splice(this.minStack.length - 1, 1);
        this.minVal.splice(this.minVal.length - 1, 1);
    }
};

/**
 * @return {number}
 */
MinStack.prototype.top = function() {
    var last = this.minStack[this.minStack.length-1]
    return last
};

/**
 * @return {number}
 */
MinStack.prototype.getMin = function() {
    var last = this.minVal[this.minVal.length-1]
    return last
};

console.log('------------------------------')

var evalRPN = function(tokens) {
    const stack = []
    let operators = ["*", "+", "-", "/"];
    for(let i = 0; i < tokens.length; i++){
        if(operators.includes(tokens[i]) && stack.length != 0){
            let firstVal = stack.pop()
            let secondVal = stack.pop()
            let result;
            if (tokens[i] === "/") {
                result = Math.trunc(secondVal / firstVal);
            } else {
                result = eval(`${secondVal} ${tokens[i]} ${firstVal}`);
            }
            stack.push(result)
        } else {
            stack.push(parseInt(tokens[i]))
        }
    }

    return stack[0]
};

//Faster solution (NOT MINE)
var evalRPN = function(tokens) {
    const stack = [];
    const operators = {
        '+': (a, b) => a + b,
        '-': (a, b) => a - b,
        '*': (a, b) => a * b,
        '/': (a, b) => Math.trunc(a / b)
    };

    for(let i = 0; i < tokens.length; i++){
        if(tokens[i] in operators){
            let firstVal = stack.pop();
            let secondVal = stack.pop();
            stack.push(operators[tokens[i]](secondVal, firstVal));
        } else {
            stack.push(parseInt(tokens[i]));
        }
    }

    return stack[0];
};

console.log(evalRPN(["2","1","+","3","*"]))
console.log(evalRPN(["4","13","5","/","+"]))
console.log(evalRPN(["10","6","9","3","+","-11","*","/","*","17","+","5","+"]))

console.log('-------------------------------')

var generateParenthesis = function(n) {
    let parStack = []
    let result = []

    pushParentheses = function (openNum, closedNum){
        if(openNum == n && closedNum == n){
            result.push(parStack.join(""))
            return
        }

        if (openNum < n){
            parStack.push("(")
            pushParentheses(openNum + 1, closedNum)
            parStack.pop()
        }

        if (closedNum < openNum){
            parStack.push(")")
            pushParentheses(openNum, closedNum + 1)
            parStack.pop()
        }
    }

    pushParentheses(0,0)
    return result
};

console.log(generateParenthesis(3))

console.log('-------------------------------')

var dailyTemperatures = function(temperatures) {
    //push each element to stack.
    //compare top of stack with previous value
    //keep track of index
    //if previous value in stack is smaller, subtract the difference in index for the smaller number and set it as the index in resultArr
    //if no greater value and no more elements, set to 0.
    
    let resultArr = new Array(temperatures.length).fill(0);
    let stack = [];

    for(let i = 0; i < temperatures.length; i++){
        while(stack.length > 0 && temperatures[i] > temperatures[stack[stack.length - 1]]){
            let index = stack.pop();
            resultArr[index] = i - index;
        }
        stack.push(i);
    }

    return resultArr;
};

console.log(dailyTemperatures([73,74,75,71,69,72,76,73]))
console.log('-------------------------------')

var containsDuplicate = function(nums) {
    let numCount = {}
    for(let i = 0; i < nums.length; i++){
        if(!numCount.hasOwnProperty(nums[i])){
            numCount[i] = nums[i]
        } else {
            return true;
        }
    }
    return false;
};

console.log(containsDuplicate([1,1,1,3,3,4,3,2,4,2]))
console.log(containsDuplicate([1,2,3,4]))
console.log(containsDuplicate([1,2,3,1]))

console.log('-------------------------------')

//Given an integer array nums, return true if any value appears more than once in the array, otherwise return false.

var isAnagram = function(s, t) {
    if (s.length !== t.length) {
        return false;
    }
    let frequency = {};
    
    for (let char of s) {
        frequency[char] = (frequency[char] || 0) + 1;
    }
    
    for (let char of t) {
        if (!frequency[char]) { 
            return false;
        }
        frequency[char] -= 1;
    }
    
    return true;
};

console.log(isAnagram("anagram", "nagaram"))
console.log(isAnagram("a", "ab"))
console.log(isAnagram("aacc", "ccac"))

console.log('-------------------------------')

function hasDuplicate(nums) {
    var count = {}
    for(let i = 0; i < nums.length; i++){
        if(!(nums[i] in count)){
            count[nums[i]] += 1
        } else {
            return true
        }
    }
    return false
}

console.log(hasDuplicate([1,2,3,4,4]))
console.log('-------------------------------')

function isAna(s, t){
    if(s.length !== t.length){
        return false
    }
    var count = {}

    for(let char of s){
        count[char] = (count[char] || 0) + 1
    }

    for(let char of t){
        if(!count[char]){
            return false
        } 
        count[char] -= 1
        
    }
    
    return true

}

console.log(isAna("racecar", "carrace"))
console.log('-------------------------------')

// indices i and j from nums array that return to sum equal target
// i and j cannot be the same index i.e. 0 and 0 = 5 + 5 = target of 10
function twoSum(nums, target){
    //take every number in nums and store it into hash object with key as number and index as value
    //loop through every nums[i] and subtract it from target, find the difference of that in the hash object. 
    // return [nums[i], count[difference]]

    var store = {}
    for(let i=0; i < nums.length; i++){
        if(!store[nums[i]]){
            store[nums[i]] = i
        }

        var difference = target - nums[i]
        if(store[difference]){
            return [nums[i], store[difference]]
        }
    }

    return []
}

console.log(twoSum([3,4,5,6,7,5,4,3], 12))
console.log('-------------------------------')

function groupAna(strs) {
    var result = {};
    for (let word of strs) {
        var count = new Array(26).fill(0); //a-z (26 letters)
        for (let character of word) {
            count[character.charCodeAt() - "a".charCodeAt()] += 1; //wherever character ascii minus a (beginning) ascii and adds 1 to that index. 
        }
        var key = count.join(','); //joins all values after counting i.e. 0,1,1,0,0,0,0,0,1..... and makes it the key
        if (!result[key]) { //checks if key already exists
            result[key] = [];
        }
        result[key].push(word); //pushes word to key if it exists already
    }
    return Object.values(result);
}

console.log(groupAna(["act", "pots", "tops", "cat", "stop", "hat"]));
console.log('-------------------------------')

function topKFreq(nums, k){
    var count = {};
    var buckets = [];
    var knumber = [];

    // Count the frequency of each number
    for (let i = 0; i < nums.length; i++) {
        if (!count.hasOwnProperty(nums[i])) {
            count[nums[i]] = 1;
        } else {
            count[nums[i]] += 1;
        }
    }

    // Create buckets based on frequency
    for (let num in count) {
        let freq = count[num];
        if (!buckets[freq]) {
            buckets[freq] = [];
        }
        buckets[freq].push(parseInt(num));
    }
    
    // Collect the top k frequent elements
    for (let i = buckets.length - 1; i >= 0 && knumber.length < k; i--) {
        if (buckets[i]) {
            knumber = knumber.concat(buckets[i]);
        }
    }

    return knumber;
}

console.log(topKFreq([1,2,2,2,3,3,3], 2))
console.log('-------------------------------')
function encode(strs) {
    //take each word, count their length, store their length + # and the word to the new string
    var encoded_str = ""
    for(let word of strs){
        var wordlng = word.length
        encoded_str += `${wordlng}#${word}`
    }

    return encoded_str
}
var test = encode(["we","say",":","yes","!@#$%^&*()"])
function decode(str) {
    var list = []
    for(let i = 0; i < str.length; i++){
        if(!isNaN(str[i])){
            var numStr = '';
            while (!isNaN(str[i])) {
                numStr += str[i];
                i++;
            }
            var wordlng = parseInt(numStr);
            if (str[i] == "#") {
                i++; 
                var word = '';
                for (let j = 0; j < wordlng; j++) {
                    word += str[i + j];
                }
                list.push(word);
                i += wordlng - 1
            }
        }
        
    }
    return list
}

//Optimal solution, review
//encode(strs) {
//     let res = "";
//     for (let s of strs) {
//         res += s.length + "#" + s;
//     }
//     return res;
// }

// /**
//  * @param {string} str
//  * @returns {string[]}
//  */
// decode(str) {
//     let res = [];
//     let i = 0;
//     while (i < str.length) {
//         let j = i;
//         while (str[j] !== '#') {
//             j++;
//         }
//         let length = parseInt(str.substring(i, j));
//         i = j + 1;
//         j = i + length;
//         res.push(str.substring(i, j));
//         i = j;
//     }
//     return res;
// }

console.log(decode(test))
console.log('-------------------------------')

var maxArea = function(height) {
    let maxArea = 0;
    let left = 0;
    let right = height.length - 1;
    for(let i = 0; i < height.length; i++){
      const area = Math.min(height[left], height[right]) * (right - left);
      maxArea = Math.max(maxArea, area);
      if(height[left] < height[right]){
        left++;
      } else {
        right--;
      }
    }
    return maxArea;
};

console.log(maxArea(179))

console.log('-------------------------------')

//Given an integer array nums, return an array output where output[i] is the product of all the elements of nums except nums[i].

//idea: left pointer and right pointer, get a set and store left and right values, then multiply each number, throw it in output array
function productExceptSel(nums){
    //set and output array creation
    var left = []
    var right = []
    var output = []

    
    for(let i = 0; i < nums.length; i++){
        left[i] = [];
        for (let j = 0; j < i; j++) {
            left[i].push(nums[j]);
        }
    }

    for(let i = 0; i < nums.length; i++){
        right[i] = [];
        for (let j = i + 1; j < nums.length; j++) {
            right[i].push(nums[j]);
        }
    }

    //take set and combined left/right sets into one, multiple each number
    //for each number, multiply += to a product, push product to output
    var testset = []
    for(let i = 0; i < left.length; i++){
        testset[i] = left[i].concat(right[i])
        var product = 1
        for (let num of testset[i]) {
            product *= num;
        }
        output.push(product)
    }

    //return output
    return output
}

console.log(productExceptSel([1,2,4,6]))

var test = [[], [1], [1,2], [1,2,4]]