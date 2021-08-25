function addReferenceID (data) {
    // Checks if correct data came
    if (data.hasOwnProperty('TerminationInquiry')) {
        try {
            // Takes number value from URL "Ref"
            data.refId =
                data.TerminationInquiry['Ref'].substring(data.TerminationInquiry['Ref'].lastIndexOf('/') + 1);

            // Returns data with new property
            return data;
        } catch (error) {
            // Returns original data if something went wrong
            console.log(error); // For logging purposes better to leave
            return data;
        }
    }

    // Returns data otherwise
    return data;
}

module.exports = {addReferenceID}