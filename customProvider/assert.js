module.exports = {
  customFunction: (output, context) => {

    // You can return a bool...
    // return output.toLowerCase().includes('bananas');

    // A score (where 0 = Fail)...
    // return 0.5;

    // Or an entire grading result, which can be simple...
    let result = {
      pass: output.toLowerCase().includes("感謝") || output.toLowerCase().includes("您好"),
      score: 1,
      reason: "Contains 感謝 or 您好",
    };

    return result;
  },
};
