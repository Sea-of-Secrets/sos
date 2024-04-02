const graph = [
    // 0
    [0,0],
    [33, 44],
    [276, 40],
    [454, 74],
    [697, 84],
    [841, 67],
    [1056, 24],
    [1343, 31],
    [3, 130],
    [69, 72],
    // 10
    [83, 115],
    [121, 82],
    [166, 83],
    [215, 124],
    [240, 84],
    [298, 137],
    [331, 95],
    [388, 90],
    [420, 105],
    [538, 85],
    //20
    [746, 92],
    [719, 131],
    [834, 95],
    [981, 34],
    [1081, 72],
    [1256, 50],
    [1297, 136],
    [1373, 110],
    [7, 208],
    [54, 161],
    // 30
    [63, 220],
    [103, 225],
    [168, 179],
    [264, 173],
    [356, 173],
    [464, 232],
    [537, 126],
    [624, 124],
    [655, 212],
    // 40
    [697, 185],
    [774, 160],
    [857, 139],
    [955, 174],
    [991, 136],
    [1205, 110],
    [1256, 211],
    [1377, 217],
    [5, 253],
    [42, 298],
    // 50
    [43, 352],
    [94, 329],
    [173, 374],
    [192, 322],
    [0, 0],
    [228, 379],
    [615, 252],
    [639, 291],
    [702, 252],
    [759, 228],
    // 60
    [0, 0],
    [0, 0],
    [1135, 148],
    [0, 0],
    [1274, 324],
    [1289, 272],
    [0, 0],
    [1374, 304],
    [56, 397],
    [116, 420],
    // 70
    [165, 454],
    [201, 450],
    [0, 0],
    [532, 349],
    [536, 388],
    [615, 375],
    [0, 0],
    [844, 485],
    [905, 536],
    [1127, 412],
    // 80
    [0, 0],
    [13, 457],
    [119, 468],
    [264, 541],
    [233, 512],
    [386, 517],
    [478, 498],
    [454, 458],
    [531, 455],
    [565, 481],
    // 90
    [669, 430],
    [845, 607],
    [0, 0],
    [860, 549],
    [0, 0],
    [1072, 497],
    [1214, 410],
    [1269, 388],
    [1360, 383],
    [58, 530],
    // 100
    [157, 614],
    [144, 554],
    [284, 605],
    [332, 582],
    [0, 0],
    [532, 537],
    [610, 579],
    [658, 656],
    [849, 690],
    [874, 584],
    // 110
    [983, 613],
    [0, 0],
    [0, 0],
    [0, 0],
    [1129, 503],
    [1236, 503],
    [1314, 459],
    [18, 660],
    [56, 597],
    [119, 657],
    // 120
    [262, 700],
    [257, 656],
    [375, 680],
    [584, 620],
    [516, 696],
    [491, 762],
    [572, 722],
    [642, 693],
    [783, 706],
    [814, 728],
    // 130
    [888, 679],
    [1020, 595],
    [1170, 543],
    [1298, 518],
    [91, 721],
    [204, 735],
    [232, 764],
    [303, 781],
    [330, 860],
    [354, 749],
    // 140
    [445, 823],
    [566, 779],
    [956, 678],
    [1007, 643],
    [0, 0],
    [1211, 648],
    [1239, 687],
    [1192, 588],
    [1285, 662],
    [1240, 579],
    // 150
    [1290, 611],
    [1313, 569],
    [55, 807],
    [109, 762],
    [79, 836],
    [154, 783],
    [192, 810],
    [205, 846],
    [292, 831],
    [254, 880],
    // 160
    [378, 835],
    [441, 923],
    [501, 847],
    [577, 832],
    [663, 755],
    [962, 743],
    [1003, 699],
    [1101, 792],
    [1160, 771],
    [1249, 849],
    // 170
    [1294, 789],
    [1338, 863],
    [1331, 683],
    [52, 921],
    [81, 876],
    [184, 917],
    [286, 951],
    [345, 913],
    [488, 924],
    [571, 862],
    // 180
    [710, 801],
    [838, 764],
    [750, 812],
    [896, 807],
    [1033, 793],
    [953, 849],
    [1122, 852],
    [1195, 841],
    [1241, 931],
    [118, 957],
    // 190
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    // 200
    [834, 579],
    [25, 103],
    [92, 29],
    [151, 40],
    [211, 55],
    [338, 57],
    [300, 76],
    [409, 56],
    [594, 64],
    [796, 69],
    // 210
    [910, 61],
    [1026, 52],
    [1182, 19],
    [1309, 23],
    [18, 173],
    [50, 133],
    [132, 128],
    [202, 107],
    [278, 118],
    [399, 125],
    // 220
    [461, 105],
    [507, 105],
    [586, 96],
    [647, 111],
    [779, 127],
    [898, 91],
    [940, 99],
    [998, 98],
    [1157, 63],
    [1270, 95],
    // 230
    [1325, 77],
    [1350, 167],
    [33, 239],
    [88, 192],
    [153, 165],
    [230, 160],
    [347, 147],
    [442, 130],
    [635, 172],
    [688, 148],
    // 240
    [1151, 119],
    [9, 295],
    [83, 285],
    [124, 257],
    [0, 0],
    [298, 196],
    [470, 270],
    [622, 224],
    [704, 225],
    [756, 202],
    // 250
    [889, 158],
    [1062, 137],
    [1260, 157],
    [5, 343],
    [9, 408],
    [87, 383],
    [134, 374],
    [161, 342],
    [212, 348],
    [0, 0],
    // 260
    [614, 299],
    [668, 250],
    [760, 248],
    [1037, 162],
    [1202, 234],
    [1369, 264],
    [60, 448],
    [153, 416],
    [191, 408],
    [221, 423],
    // 270
    [472, 318],
    [584, 360],
    [630, 340],
    [0, 0],
    [882, 498],
    [0, 0],
    [1236, 281],
    [1231, 331],
    [1334, 331],
    [68, 489],
    // 280
    [125, 516],
    [194, 537],
    [226, 478],
    [0, 0],
    [586, 412],
    [0, 0],
    [1173, 400],
    [1107, 455],
    [16, 562],
    [105, 556],
    // 290
    [226, 584],
    [317, 562],
    [427, 499],
    [524, 424],
    [522, 501],
    [605, 450],
    [706, 435],
    [757, 453],
    [870, 525],
    [986, 532],
    // 300
    [1269, 440],
    [1325, 419],
    [29, 614],
    [114, 595],
    [242, 630],
    [340, 624],
    [557, 585],
    [577, 558],
    [851, 642],
    [648, 614],
    // 310
    [691, 710],
    [802, 681],
    [956, 571],
    [908, 617],
    [1066, 549],
    [1187, 472],
    [1283, 494],
    [1260, 554],
    [1341, 541],
    [58, 689],
    // 320
    [171, 689],
    [332, 661],
    [318, 712],
    [556, 660],
    [522, 731],
    [595, 678],
    [735, 743],
    [897, 737],
    [1094, 590],
    [143, 743],
    // 330
    [209, 710],
    [282, 742],
    [335, 820],
    [402, 734],
    [408, 865],
    [483, 799],
    [519, 810],
    [953, 648],
    [1155, 601],
    [1239, 609],
    // 340
    [1334, 627],
    [92, 788],
    [140, 837],
    [258, 793],
    [371, 803],
    [419, 900],
    [616, 789],
    [966, 708],
    [1199, 713],
    [1295, 721],
    // 350
    [37, 842],
    [155, 883],
    [209, 883],
    [305, 893],
    [352, 885],
    [495, 895],
    [712, 775],
    [961, 788],
    [1158, 809],
    [1243, 794],
    // 360
    [1247, 891],
    [1343, 783],
    [1321, 916],
    [40, 883],
    [104, 922],
    [266, 919],
    [39, 960],
    [204, 956],
    [381, 951],
    [473, 964],
    // 370
    [650, 829],
    [828, 799],
    [1065, 886],
    [1123, 910]
]
    
    //[703, 496]