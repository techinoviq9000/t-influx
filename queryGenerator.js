

const numtoword = (number) => {
    switch (number) {
        case 1:
            return "one"
            case 2:
              return "two"
              case 3:
            return "three"
            case 4:
            return "four"
            case 5:
            return "five"
            case 6:
            return "six"
            case 7:
            return "seven"
            case 8:
            return "eight"
    }
}

const middleString = (number, word) => {
  return  `${word}: insert_data_table_one(
    object: {
      value: $value_${number}
      field_id: $field_id_${number}
      applicant_id: $applicant_id_${number}
    },
    on_conflict: {constraint: data_table_field_id_applicant_id_key, update_columns: value, where: {field_id: {_eq: $field_id_${number}}}}
  ) {
    id
  } `
}
const generateQuery = (number) => {
    let startString = `mutation MyMutation(`
      let firstString = ""
      let closeFirstString = `) {`
      let endString = `}`
      let middlestring = ""
      for (let i = 1; i <= number; i++) {
        firstString+=`$value_${i}: String $field_id_${i}: Int!
          $applicant_id_${i}: uuid! `
          middlestring+=middleString(i, numtoword(i))
      }

      let finalString = `${startString} ${firstString} ${closeFirstString} ${middlestring} ${endString}`
      return finalString
}

console.log(generateQuery(10))
