
// Strategy guide according to https://www.blackjackclassroom.com/blackjack-basic-strategy-charts without split hand options 
//'playerTotal'-'hasAceBoolean'-'dealerCard'
const strategy = {
  '21-false-2' : 'Stand',//playerTotal (21-17) strategy is the same
  '21-false-3' : 'Stand',
  '21-false-4' : 'Stand',
  '21-false-5' : 'Stand',
  '21-false-6' : 'Stand',
  '21-false-7' : 'Stand',
  '21-false-8' : 'Stand',
  '21-false-9' : 'Stand',
  '21-false-10': 'Stand',
  '21-false-A' : 'Stand',
  '20-false-2' : 'Stand',//playerTotal (21-17) strategy is the same
  '20-false-3' : 'Stand',
  '20-false-4' : 'Stand',
  '20-false-5' : 'Stand',
  '20-false-6' : 'Stand',
  '20-false-7' : 'Stand',
  '20-false-8' : 'Stand',
  '20-false-9' : 'Stand',
  '20-false-10': 'Stand',
  '20-false-A' : 'Stand',
  '19-false-2' : 'Stand',//playerTotal (21-17) strategy is the same
  '19-false-3' : 'Stand',
  '19-false-4' : 'Stand',
  '19-false-5' : 'Stand',
  '19-false-6' : 'Stand',
  '19-false-7' : 'Stand',
  '19-false-8' : 'Stand',
  '19-false-9' : 'Stand',
  '19-false-10': 'Stand',
  '19-false-A' : 'Stand',
  '18-false-2' : 'Stand',//playerTotal (21-17) strategy is the same
  '18-false-3' : 'Stand',
  '18-false-4' : 'Stand',
  '18-false-5' : 'Stand',
  '18-false-6' : 'Stand',
  '18-false-7' : 'Stand',
  '18-false-8' : 'Stand',
  '18-false-9' : 'Stand',
  '18-false-10': 'Stand',
  '18-false-A' : 'Stand',
  '17-false-2' : 'Stand',//playerTotal (21-17) strategy is the same
  '17-false-3' : 'Stand',
  '17-false-4' : 'Stand',
  '17-false-5' : 'Stand',
  '17-false-6' : 'Stand',
  '17-false-7' : 'Stand',
  '17-false-8' : 'Stand',
  '17-false-9' : 'Stand',
  '17-false-10': 'Stand',
  '17-false-A' : 'Stand',
  '16-false-2' : 'Stand',//playerTotal (13-16) strategy is the same
  '16-false-3' : 'Stand',
  '16-false-4' : 'Stand',
  '16-false-5' : 'Stand',
  '16-false-6' : 'Stand',
  '16-false-7' : 'Hit',
  '16-false-8' : 'Hit',
  '16-false-9' : 'Hit',
  '16-false-10': 'Hit',
  '16-false-A' : 'Hit',
  '15-false-2' : 'Stand',//playerTotal (13-16) strategy is the same
  '15-false-3' : 'Stand',
  '15-false-4' : 'Stand',
  '15-false-5' : 'Stand',
  '15-false-6' : 'Stand',
  '15-false-7' : 'Hit',
  '15-false-8' : 'Hit',
  '15-false-9' : 'Hit',
  '15-false-10': 'Hit',
  '15-false-A' : 'Hit',
  '14-false-2' : 'Stand',//playerTotal (13-16) strategy is the same
  '14-false-3' : 'Stand',
  '14-false-4' : 'Stand',
  '14-false-5' : 'Stand',
  '14-false-6' : 'Stand',
  '14-false-7' : 'Hit',
  '14-false-8' : 'Hit',
  '14-false-9' : 'Hit',
  '14-false-10': 'Hit',
  '14-false-A' : 'Hit',
  '13-false-2' : 'Stand',//playerTotal (13-16) strategy is the same
  '13-false-3' : 'Stand',
  '13-false-4' : 'Stand',
  '13-false-5' : 'Stand',
  '13-false-6' : 'Stand',
  '13-false-7' : 'Hit',
  '13-false-8' : 'Hit',
  '13-false-9' : 'Hit',
  '13-false-10': 'Hit',
  '13-false-A' : 'Hit',
  '12-false-2' : 'Hit',
  '12-false-3' : 'Hit',
  '12-false-4' : 'Stand',
  '12-false-5' : 'Stand',
  '12-false-6' : 'Stand',
  '12-false-7' : 'Hit',
  '12-false-8' : 'Hit',
  '12-false-9' : 'Hit',
  '12-false-10': 'Hit',
  '12-false-A' : 'Hit',
  '11-false-2' : 'Double Down',
  '11-false-3' : 'Double Down',
  '11-false-4' : 'Double Down',
  '11-false-5' : 'Double Down',
  '11-false-6' : 'Double Down',
  '11-false-7' : 'Double Down',
  '11-false-8' : 'Double Down',
  '11-false-9' : 'Double Down',
  '11-false-10': 'Double Down',
  '11-false-A' : 'Hit',
  '10-false-2' : 'Double Down',
  '10-false-3' : 'Double Down',
  '10-false-4' : 'Double Down',
  '10-false-5' : 'Double Down',
  '10-false-6' : 'Double Down',
  '10-false-7' : 'Double Down',
  '10-false-8' : 'Double Down',
  '10-false-9' : 'Double Down',
  '10-false-10': 'Hit',
  '10-false-A' : 'Hit',
  '9-false-2'  : 'Hit',
  '9-false-3'  : 'Double Down',
  '9-false-4'  : 'Double Down',
  '9-false-5'  : 'Double Down',
  '9-false-6'  : 'Double Down',
  '9-false-7'  : 'Hit',
  '9-false-8'  : 'Hit',
  '9-false-9'  : 'Hit',
  '9-false-10' : 'Hit',
  '9-false-A'  : 'Hit',
  '8-false-2'  : 'Hit',//playerTotal (4-8)strategy is the same
  '8-false-3'  : 'Hit',
  '8-false-4'  : 'Hit',
  '8-false-5'  : 'Hit',
  '8-false-6'  : 'Hit',
  '8-false-7'  : 'Hit',
  '8-false-8'  : 'Hit',
  '8-false-9'  : 'Hit',
  '8-false-10' : 'Hit',
  '8-false-A'  : 'Hit',
  '7-false-2'  : 'Hit',//playerTotal (4-8)strategy is the same
  '7-false-3'  : 'Hit',
  '7-false-4'  : 'Hit',
  '7-false-5'  : 'Hit',
  '7-false-6'  : 'Hit',
  '7-false-7'  : 'Hit',
  '7-false-8'  : 'Hit',
  '7-false-9'  : 'Hit',
  '7-false-10' : 'Hit',
  '7-false-A'  : 'Hit',
  '6-false-2'  : 'Hit',//playerTotal (4-8)strategy is the same
  '6-false-3'  : 'Hit',
  '6-false-4'  : 'Hit',
  '6-false-5'  : 'Hit',
  '6-false-6'  : 'Hit',
  '6-false-7'  : 'Hit',
  '6-false-8'  : 'Hit',
  '6-false-9'  : 'Hit',
  '6-false-10' : 'Hit',
  '6-false-A'  : 'Hit',
  '5-false-2'  : 'Hit',//playerTotal (4-8)strategy is the same
  '5-false-3'  : 'Hit',
  '5-false-4'  : 'Hit',
  '5-false-5'  : 'Hit',
  '5-false-6'  : 'Hit',
  '5-false-7'  : 'Hit',
  '5-false-8'  : 'Hit',
  '5-false-9'  : 'Hit',
  '5-false-10' : 'Hit',
  '5-false-A'  : 'Hit',
  '4-false-2'  : 'Hit',//playerTotal (4-8)strategy is the same
  '4-false-3'  : 'Hit',
  '4-false-4'  : 'Hit',
  '4-false-5'  : 'Hit',
  '4-false-6'  : 'Hit',
  '4-false-7'  : 'Hit',
  '4-false-8'  : 'Hit',
  '4-false-9'  : 'Hit',
  '4-false-10' : 'Hit',
  '4-false-A'  : 'Hit',
  '21-true-2'  : 'Stand',
  '21-true-3'  : 'Stand',
  '21-true-4'  : 'Stand',
  '21-true-5'  : 'Stand',
  '21-true-6'  : 'Stand',
  '21-true-7'  : 'Stand',
  '21-true-8'  : 'Stand',
  '21-true-9'  : 'Stand',
  '21-true-10' : 'Stand',
  '21-true-A'  : 'Stand',
  '20-true-2'  : 'Stand',
  '20-true-3'  : 'Stand',
  '20-true-4'  : 'Stand',
  '20-true-5'  : 'Stand',
  '20-true-6'  : 'Stand',
  '20-true-7'  : 'Stand',
  '20-true-8'  : 'Stand',
  '20-true-9'  : 'Stand',
  '20-true-10' : 'Stand',
  '20-true-A'  : 'Stand',
  '19-true-2'  : 'Stand',//A-8
  '19-true-3'  : 'Stand',
  '19-true-4'  : 'Stand',
  '19-true-5'  : 'Stand',
  '19-true-6'  : 'Stand',
  '19-true-7'  : 'Stand',
  '19-true-8'  : 'Stand',
  '19-true-9'  : 'Stand',
  '19-true-10' : 'Stand',
  '19-true-A'  : 'Stand',
  '18-true-2'  : 'Stand',//A-7
  '18-true-3'  : 'Double Down',
  '18-true-4'  : 'Double Down',
  '18-true-5'  : 'Double Down',
  '18-true-6'  : 'Double Down',
  '18-true-7'  : 'Stand',
  '18-true-8'  : 'Stand',
  '18-true-9'  : 'Hit',
  '18-true-10' : 'Hit',
  '18-true-A'  : 'Hit',
  '17-true-2'  : 'Hit',//A-6
  '17-true-3'  : 'Double Down',
  '17-true-4'  : 'Double Down',
  '17-true-5'  : 'Double Down',
  '17-true-6'  : 'Double Down',
  '17-true-7'  : 'Hit',
  '17-true-8'  : 'Hit',
  '17-true-9'  : 'Hit',
  '17-true-10' : 'Hit',
  '17-true-A'  : 'Hit',
  '16-true-2'  : 'Hit',//A-5
  '16-true-3'  : 'Hit',
  '16-true-4'  : 'Double Down',
  '16-true-5'  : 'Double Down',
  '16-true-6'  : 'Double Down',
  '16-true-7'  : 'Hit',
  '16-true-8'  : 'Hit',
  '16-true-9'  : 'Hit',
  '16-true-10' : 'Hit',
  '16-true-A'  : 'Hit',
  '15-true-2'  : 'Hit',//A-4
  '15-true-3'  : 'Hit',
  '15-true-4'  : 'Double Down',
  '15-true-5'  : 'Double Down',
  '15-true-6'  : 'Double Down',
  '15-true-7'  : 'Hit',
  '15-true-8'  : 'Hit',
  '15-true-9'  : 'Hit',
  '15-true-10' : 'Hit',
  '15-true-A'  : 'Hit',
  '14-true-2'  : 'Hit',//A-3
  '14-true-3'  : 'Hit',
  '14-true-4'  : 'Hit',
  '14-true-5'  : 'Double Down',
  '14-true-6'  : 'Double Down',
  '14-true-7'  : 'Hit',
  '14-true-8'  : 'Hit',
  '14-true-9'  : 'Hit',
  '14-true-10' : 'Hit',
  '14-true-A'  : 'Hit',
  '13-true-2'  : 'Hit',//A-2
  '13-true-3'  : 'Hit',
  '13-true-4'  : 'Hit',
  '13-true-5'  : 'Double Down',
  '13-true-6'  : 'Double Down',
  '13-true-7'  : 'Hit',
  '13-true-8'  : 'Hit',
  '13-true-9'  : 'Hit',
  '13-true-10' : 'Hit',
  '13-true-A'  : 'Hit',
  '12-true-2'  : 'Hit',//A-A
  '12-true-3'  : 'Hit',
  '12-true-4'  : 'Hit',
  '12-true-5'  : 'Double Down',
  '12-true-6'  : 'Double Down',
  '12-true-7'  : 'Hit',
  '12-true-8'  : 'Hit',
  '12-true-9'  : 'Hit',
  '12-true-10' : 'Hit',
  '12-true-A'  : 'Hit',
}

