
// Strategy guide according to https://www.blackjackclassroom.com/blackjack-basic-strategy-charts without split hand options 
//'playerTotal'-'hasAceBoolean'-'dealerCard'
const strategy = {
  '21-false-2' : 'stand',//playerTotal (21-17) strategy is the same
  '21-false-3' : 'stand',
  '21-false-4' : 'stand',
  '21-false-5' : 'stand',
  '21-false-6' : 'stand',
  '21-false-7' : 'stand',
  '21-false-8' : 'stand',
  '21-false-9' : 'stand',
  '21-false-10': 'stand',
  '21-false-A' : 'stand',
  '20-false-2' : 'stand',//playerTotal (21-17) strategy is the same
  '20-false-3' : 'stand',
  '20-false-4' : 'stand',
  '20-false-5' : 'stand',
  '20-false-6' : 'stand',
  '20-false-7' : 'stand',
  '20-false-8' : 'stand',
  '20-false-9' : 'stand',
  '20-false-10': 'stand',
  '20-false-A' : 'stand',
  '19-false-2' : 'stand',//playerTotal (21-17) strategy is the same
  '19-false-3' : 'stand',
  '19-false-4' : 'stand',
  '19-false-5' : 'stand',
  '19-false-6' : 'stand',
  '19-false-7' : 'stand',
  '19-false-8' : 'stand',
  '19-false-9' : 'stand',
  '19-false-10': 'stand',
  '19-false-A' : 'stand',
  '18-false-2' : 'stand',//playerTotal (21-17) strategy is the same
  '18-false-3' : 'stand',
  '18-false-4' : 'stand',
  '18-false-5' : 'stand',
  '18-false-6' : 'stand',
  '18-false-7' : 'stand',
  '18-false-8' : 'stand',
  '18-false-9' : 'stand',
  '18-false-10': 'stand',
  '18-false-A' : 'stand',
  '17-false-2' : 'stand',//playerTotal (21-17) strategy is the same
  '17-false-3' : 'stand',
  '17-false-4' : 'stand',
  '17-false-5' : 'stand',
  '17-false-6' : 'stand',
  '17-false-7' : 'stand',
  '17-false-8' : 'stand',
  '17-false-9' : 'stand',
  '17-false-10': 'stand',
  '17-false-A' : 'stand',
  '16-false-2' : 'stand',//playerTotal (13-16) strategy is the same
  '16-false-3' : 'stand',
  '16-false-4' : 'stand',
  '16-false-5' : 'stand',
  '16-false-6' : 'stand',
  '16-false-7' : 'hit',
  '16-false-8' : 'hit',
  '16-false-9' : 'hit',
  '16-false-10': 'hit',
  '16-false-A' : 'hit',
  '15-false-2' : 'stand',//playerTotal (13-16) strategy is the same
  '15-false-3' : 'stand',
  '15-false-4' : 'stand',
  '15-false-5' : 'stand',
  '15-false-6' : 'stand',
  '15-false-7' : 'hit',
  '15-false-8' : 'hit',
  '15-false-9' : 'hit',
  '15-false-10': 'hit',
  '15-false-A' : 'hit',
  '14-false-2' : 'stand',//playerTotal (13-16) strategy is the same
  '14-false-3' : 'stand',
  '14-false-4' : 'stand',
  '14-false-5' : 'stand',
  '14-false-6' : 'stand',
  '14-false-7' : 'hit',
  '14-false-8' : 'hit',
  '14-false-9' : 'hit',
  '14-false-10': 'hit',
  '14-false-A' : 'hit',
  '13-false-2' : 'stand',//playerTotal (13-16) strategy is the same
  '13-false-3' : 'stand',
  '13-false-4' : 'stand',
  '13-false-5' : 'stand',
  '13-false-6' : 'stand',
  '13-false-7' : 'hit',
  '13-false-8' : 'hit',
  '13-false-9' : 'hit',
  '13-false-10': 'hit',
  '13-false-A' : 'hit',
  '12-false-2' : 'hit',
  '12-false-3' : 'hit',
  '12-false-4' : 'stand',
  '12-false-5' : 'stand',
  '12-false-6' : 'stand',
  '12-false-7' : 'hit',
  '12-false-8' : 'hit',
  '12-false-9' : 'hit',
  '12-false-10': 'hit',
  '12-false-A' : 'hit',
  '11-false-2' : 'double',
  '11-false-3' : 'double',
  '11-false-4' : 'double',
  '11-false-5' : 'double',
  '11-false-6' : 'double',
  '11-false-7' : 'double',
  '11-false-8' : 'double',
  '11-false-9' : 'double',
  '11-false-10': 'double',
  '11-false-A' : 'hit',
  '10-false-2' : 'double',
  '10-false-3' : 'double',
  '10-false-4' : 'double',
  '10-false-5' : 'double',
  '10-false-6' : 'double',
  '10-false-7' : 'double',
  '10-false-8' : 'double',
  '10-false-9' : 'double',
  '10-false-10': 'hit',
  '10-false-A' : 'hit',
  '9-false-2'  : 'hit',
  '9-false-3'  : 'double',
  '9-false-4'  : 'double',
  '9-false-5'  : 'double',
  '9-false-6'  : 'double',
  '9-false-7'  : 'hit',
  '9-false-8'  : 'hit',
  '9-false-9'  : 'hit',
  '9-false-10' : 'hit',
  '9-false-A'  : 'hit',
  '8-false-2'  : 'hit',//playerTotal (4-8)strategy is the same
  '8-false-3'  : 'hit',
  '8-false-4'  : 'hit',
  '8-false-5'  : 'hit',
  '8-false-6'  : 'hit',
  '8-false-7'  : 'hit',
  '8-false-8'  : 'hit',
  '8-false-9'  : 'hit',
  '8-false-10' : 'hit',
  '8-false-A'  : 'hit',
  '7-false-2'  : 'hit',//playerTotal (4-8)strategy is the same
  '7-false-3'  : 'hit',
  '7-false-4'  : 'hit',
  '7-false-5'  : 'hit',
  '7-false-6'  : 'hit',
  '7-false-7'  : 'hit',
  '7-false-8'  : 'hit',
  '7-false-9'  : 'hit',
  '7-false-10' : 'hit',
  '7-false-A'  : 'hit',
  '6-false-2'  : 'hit',//playerTotal (4-8)strategy is the same
  '6-false-3'  : 'hit',
  '6-false-4'  : 'hit',
  '6-false-5'  : 'hit',
  '6-false-6'  : 'hit',
  '6-false-7'  : 'hit',
  '6-false-8'  : 'hit',
  '6-false-9'  : 'hit',
  '6-false-10' : 'hit',
  '6-false-A'  : 'hit',
  '5-false-2'  : 'hit',//playerTotal (4-8)strategy is the same
  '5-false-3'  : 'hit',
  '5-false-4'  : 'hit',
  '5-false-5'  : 'hit',
  '5-false-6'  : 'hit',
  '5-false-7'  : 'hit',
  '5-false-8'  : 'hit',
  '5-false-9'  : 'hit',
  '5-false-10' : 'hit',
  '5-false-A'  : 'hit',
  '4-false-2'  : 'hit',//playerTotal (4-8)strategy is the same
  '4-false-3'  : 'hit',
  '4-false-4'  : 'hit',
  '4-false-5'  : 'hit',
  '4-false-6'  : 'hit',
  '4-false-7'  : 'hit',
  '4-false-8'  : 'hit',
  '4-false-9'  : 'hit',
  '4-false-10' : 'hit',
  '4-false-A'  : 'hit',
  '21-true-2' : 'stand',
  '21-true-3' : 'stand',
  '21-true-4' : 'stand',
  '21-true-5' : 'stand',
  '21-true-6' : 'stand',
  '21-true-7' : 'stand',
  '21-true-8' : 'stand',
  '21-true-9' : 'stand',
  '21-true-10': 'stand',
  '21-true-A' : 'stand',
  '20-true-2' : 'stand',
  '20-true-3' : 'stand',
  '20-true-4' : 'stand',
  '20-true-5' : 'stand',
  '20-true-6' : 'stand',
  '20-true-7' : 'stand',
  '20-true-8' : 'stand',
  '20-true-9' : 'stand',
  '20-true-10': 'stand',
  '20-true-A' : 'stand',
  '19-true-2' : 'stand',//A-8
  '19-true-3' : 'stand',
  '19-true-4' : 'stand',
  '19-true-5' : 'stand',
  '19-true-6' : 'stand',
  '19-true-7' : 'stand',
  '19-true-8' : 'stand',
  '19-true-9' : 'stand',
  '19-true-10': 'stand',
  '19-true-A' : 'stand',
  '18-true-2' : 'stand',//A-7
  '18-true-3' : 'double',
  '18-true-4' : 'double',
  '18-true-5' : 'double',
  '18-true-6' : 'double',
  '18-true-7' : 'stand',
  '18-true-8' : 'stand',
  '18-true-9' : 'hit',
  '18-true-10': 'hit',
  '18-true-A' : 'hit',
  '17-true-2' : 'hit',//A-6
  '17-true-3' : 'double',
  '17-true-4' : 'double',
  '17-true-5' : 'double',
  '17-true-6' : 'double',
  '17-true-7' : 'hit',
  '17-true-8' : 'hit',
  '17-true-9' : 'hit',
  '17-true-10': 'hit',
  '17-true-A' : 'hit',
  '16-true-2' : 'hit',//A-5
  '16-true-3' : 'hit',
  '16-true-4' : 'double',
  '16-true-5' : 'double',
  '16-true-6' : 'double',
  '16-true-7' : 'hit',
  '16-true-8' : 'hit',
  '16-true-9' : 'hit',
  '16-true-10': 'hit',
  '16-true-A' : 'hit',
  '15-true-2' : 'hit',//A-4
  '15-true-3' : 'hit',
  '15-true-4' : 'double',
  '15-true-5' : 'double',
  '15-true-6' : 'double',
  '15-true-7' : 'hit',
  '15-true-8' : 'hit',
  '15-true-9' : 'hit',
  '15-true-10': 'hit',
  '15-true-A' : 'hit',
  '14-true-2' : 'hit',//A-3
  '14-true-3' : 'hit',
  '14-true-4' : 'hit',
  '14-true-5' : 'double',
  '14-true-6' : 'double',
  '14-true-7' : 'hit',
  '14-true-8' : 'hit',
  '14-true-9' : 'hit',
  '14-true-10': 'hit',
  '14-true-A' : 'hit',
  '13-true-2' : 'hit',//A-2
  '13-true-3' : 'hit',
  '13-true-4' : 'hit',
  '13-true-5' : 'double',
  '13-true-6' : 'double',
  '13-true-7' : 'hit',
  '13-true-8' : 'hit',
  '13-true-9' : 'hit',
  '13-true-10': 'hit',
  '13-true-A' : 'hit',
  '12-true-2' : 'hit',//A-A
  '12-true-3' : 'hit',
  '12-true-4' : 'hit',
  '12-true-5' : 'double',
  '12-true-6' : 'double',
  '12-true-7' : 'hit',
  '12-true-8' : 'hit',
  '12-true-9' : 'hit',
  '12-true-10': 'hit',
  '12-true-A' : 'hit',
}

