function initializeClock(id, endtime) {
  var clock = document.getElementById(id);
  var daysSpan = clock.querySelector('.days');
  var hoursSpan = clock.querySelector('.hours');
  var minutesSpan = clock.querySelector('.minutes');
  var secondsSpan = clock.querySelector('.seconds');

  function updateClock() {
    var t = getTimeRemaining(endtime);

    daysSpan.innerHTML = t.days;
    hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
    minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
    secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

    if (t.total <= 0) {
      clearInterval(timeinterval);
    }
  }

  updateClock();
  var timeinterval = setInterval(updateClock, 1000);
}

var deadline = new Date("4/25/2018");
initializeClock('clockdiv', deadline);

function setup() {
    var abiArray = [{"anonymous":false,"inputs":[{"indexed":false,"name":"user","type":"address"},{"indexed":false,"name":"dividends","type":"uint256"}],"name":"Reinvest","type":"event"},{"constant":false,"inputs":[],"name":"claim","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"user","type":"address"},{"indexed":false,"name":"dividends","type":"uint256"}],"name":"Claim","type":"event"},{"constant":false,"inputs":[],"name":"deposit","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"user","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"user","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"constant":false,"inputs":[{"name":"_user","type":"address"}],"name":"preauthorize","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"reinvest","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"startGame","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_amount","type":"uint256"}],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"constant":true,"inputs":[{"name":"_user","type":"address"}],"name":"dividendsForUser","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"investment","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"stake","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalStake","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}];
    var contractAddress = "0x9b2b16f9a9a65425ee9a117aa6ba9f0603d973f7";
    var contract = web3.eth.contract(abiArray).at(contractAddress);

    if (web3.eth.defaultAccount !== undefined) {
        $("#airdrop-button").prop("disabled", false);
        $("#raffle-button").prop("disabled", false);
    }

    $("#raffle-button").click(function() {
        contract.investment(web3.eth.defaultAccount, function(error, result) {
          if (!error)
              alert(result);
              contract.withdraw(result, function(error, result2) {
                  if (!error)
                      console.log(result2);
              });
          });

    });

    $("#airdrop-button").click(function() {
        contract.reinvest(function(error, result) {
            if (!error)
                console.log(result);
        });
    });

    function refresh() {
        function formatEth(wei) {
            return web3.fromWei(wei, "ether").toFormat(4) + " ETH";
        }
    }

    refresh();
    setInterval(refresh, 1000);
}

window.addEventListener("load", function() {
    if (typeof web3 !== "undefined") {
        web3 = new Web3(web3.currentProvider);
        web3.version.getNetwork(function(error, result) {
            if (!error) {
                if (result == "1") {
                    setup();
                } else {
                    $("#error").text("You must be on the Main Ethereum Network to use this website.");
                    $("#error").toggle(true);
                }
            }
        });
    } else {
        $("#error").html('Please install <a class="text-success" href="https://metamask.io/">MetaMask</a> to use this website.');
        $("#error").toggle(true);
        web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/EDcemR2TA0oKZOWw2VZv"));
        setup();
    }
});


function getTimeRemaining(endtime) {
  var t = Date.parse(endtime) - Date.parse(new Date());
  var seconds = Math.floor((t / 1000) % 60);
  var minutes = Math.floor((t / 1000 / 60) % 60);
  var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
  var days = Math.floor(t / (1000 * 60 * 60 * 24));
  return {
    'total': t,
    'days': days,
    'hours': hours,
    'minutes': minutes,
    'seconds': seconds
  };
}

