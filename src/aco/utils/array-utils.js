class ArrayUtils {
  static newMatrix(lines, columns, initialValue = 0) {
    return Array(lines)
      .fill()
      .map(() => Array(columns).fill(initialValue));
  }

  static minAndMaxArray(array) {
    return {
      min: Math.min(...array),
      max: Math.max(...array),
    };
  }

  static minAndMax(matrix) {
    let min = [];
    let max = [];

    for (let i = 0; i < matrix.length; i++) {
      min.push(Math.min(...matrix[i]));
      max.push(Math.max(...matrix[i]));
    }

    return {
      min: Math.min(...min),
      max: Math.max(...max),
    };
  }
}

export default ArrayUtils;
