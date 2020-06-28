const HOST = 'http://localhost:4040';

function main() {
    $('#form').submit(function (e) {
        e.preventDefault();

        const loader = $('#loader')[0];
        loader.style = 'display: block; width: 4rem; height: 4rem;';
        $('#results')[0].style = 'display: none';

        let url = HOST + '/loan-account-info';

        url = url + `?loanId=${$('#loanId')[0].value}`;

        $.get({
            url: url,
            processData: false,
            contentType: false,
            success: (data) => {
                console.log(data);
                writeResults(data);
            }
        });
    });
}

function writeResults(results) {
    const resultsContainer = $('#results')[0];

    const loader = $('#loader')[0];
    loader.style = 'display: none';

    if (!results.length) {
        const messageEl = document.createElement('p');
        messageEl.innerHTML = '<strong>No results found for given loan account.</strong>';
        resultsContainer.appendChild(messageEl);
        resultsContainer.style = 'display: block; width: 40%; margin-top: 5vh; margin-left: 30.5%; color: red;';
        $('#resultsTable')[0].style = 'display: none';
        return;
    }

    $('#customerName')[0].innerText = results[0].customername;
    $('#fatherName')[0].innerText = results[0].fathername;
    $('#loanAmount')[0].innerText = results[0].loan_amount;
    $('#address')[0].innerText = results[0].mailingaddress;
    $('#city')[0].innerText = results[0].mailingcity;
    $('#landmark')[0].innerText = results[0].mailinglandmark;
    $('#zip')[0].innerText = results[0].mailingzipcode;
    $('#state')[0].innerText = results[0].mailingstate;
    $('#mobile')[0].innerText = results[0].mailingmobile;

    resultsContainer.style = 'display: block';
}

main();