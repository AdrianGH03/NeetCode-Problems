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