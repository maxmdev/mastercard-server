function addReferenceID (data) {
    // Checks if correct data came
    if (data.hasOwnProperty('TerminationInquiry')) {
        try {
            // Takes number value from URL "Ref"
            data.TerminationInquiry.refId =
                data.TerminationInquiry['Ref'].substring(data.TerminationInquiry['Ref'].lastIndexOf('/') + 1);

            // Returns data with new property
            return data;
        } catch (error) {
            // Returns original data if something went wrong and logs error
            console.log(error);
            return data;
        }
    }

    // Returns data otherwise
    return data;
}

function formatDate (data) {
    // Retrieves object from input data
    const dataParsed = JSON.parse(data);

    // Checks if correct data came into
    if (dataParsed.hasOwnProperty('AddMerchantRequest')) {
        // Checks if Merchant object presents in input data
        if (dataParsed.AddMerchantRequest.hasOwnProperty('Merchant')) {
            // Replaces data-fields to format needed [mm/dd/yyyy]
            try {
                const dateOpened = new Date(dataParsed.AddMerchantRequest.Merchant['DateOpened']);
                const dateClosed = new Date(dataParsed.AddMerchantRequest.Merchant['DateClosed']);

                dataParsed.AddMerchantRequest.Merchant['DateOpened'] = dateOpened.toLocaleDateString("en-US");
                dataParsed.AddMerchantRequest.Merchant['DateClosed'] = dateClosed.toLocaleDateString("en-US");

                // Returns changed data
                return JSON.stringify(dataParsed);
            } catch (error) {
                // Otherwise logs an error and returns untouched data
                console.log(error);
                return data;
            }
        }
    }
}

module.exports = {addReferenceID, formatDate}