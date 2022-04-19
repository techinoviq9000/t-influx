

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
            case 9:
            return "nine"
            case 10:
            return "ten"
    }
}

const middleString = (number, word) => {
  return  `${word}: insert_data_table_one(
    object: {
      value: $value_${number}
      field_id: $field_id_${number}
      analysis: $analysis_${number}
      applicant_id: $applicant_id
    },
    on_conflict: {constraint: data_table_field_id_applicant_id_key, update_columns: [value, analysis], where: {field_id: {_eq: $field_id_${number}}}}
  ) {
    id
  } `
}
export default generateQuery = (number) => {
    let startString = `mutation MyMutation(`
      let firstString = ""
      let closeFirstString = `) {`
      let endString = `}`
      let middlestring = ""
      for (let i = 1; i <= number; i++) {
        firstString+=`$value_${i}: String $field_id_${i}: Int! $analysis_${i}: json
          `
          middlestring+=middleString(i, numtoword(i))
      }

      let finalString = `${startString} ${firstString} $applicant_id: uuid! ${closeFirstString} ${middlestring} ${endString}`
      return finalString
}


let data =  [
   {
   
    dropdown_values:  [
      "Clifton",
      "Bahadrubad",
      "Tariq Road",
    ],
    field_name: "Branch Name",
    id: 7,
    place_holder: "elect Branch Name",
  },
   {
    
    dropdown_values:  [
      "Individual (Single)",
      "Joint (Either/Survivor)",
      "Minor (Joint)",
    ],
    field_name: "Customer Type",
    id: 8,
    place_holder: "Select Type",
  },
   {
    
    dropdown_values:  [
      "Salary Transfer",
      "Savings",
      "Business",
      "Consumer Loans",
      "Investment",
      "Others",
    ],
    field_name: "Purpose of Account",
    id: 9,
    place_holder: "Select Purpose of Account",
  },
   {
    
    dropdown_values:  [
      "PKR Current Account",
      "PKR Savings Account (Monthly)",
      "USD Current Account",
      "USD Savings Account (Monthly)",
      "AED Current Account",
      "AED Savings Account (Monthly)",
      "Euro Current Account",
      "Euro Savings Account (Monthly)",
      "SAR Current Account",
      "SAR Savings Account (Monthly)",
      "GBP Current Account",
      "GBP Savings Account (Monthly)",
    ],
    field_name: "Account Type (1)",
    id: 10,
    place_holder: "Select Account Type (1)",
  },
]
