package com.ssafy.sos.game.domain;

import com.ssafy.sos.game.util.GameMode;
import com.ssafy.sos.game.util.GameStatus;
import lombok.Data;
import org.springframework.stereotype.Component;
import java.util.HashMap;
import java.util.List;

@Data
@Component
public class Board {
    private int[][] graph;
    private int[][] water;

    private int[] one;
    private int[] two;
    private int[] three;
    private int[] four;

    private int[] marineStartList;

    // sessionId : { nickname, gameId }
    private HashMap<String, List<String>> sessionMap;
    private HashMap<String, Game> gameMap;
    private HashMap<String, Room> roomMap;

    public Board() {
        this.graph = new int[][] {
                // 0
                {},
                {201, 202},
                {204, 205, 206},
                {207, 208, 220},
                {208, 209},
                {209, 210},
                {211, 212},
                {213, 230},
                {201, 214},
                {201, 202},
                // 10
                {215, 216},
                {202, 216},
                {203, 217},
                {217, 218, 234, 235},
                {204, 217, 218},
                {218, 236},
                {206, 207, 218},
                {207, 219},
                {219, 220},
                {221, 222},
                // 20
                {209, 223, 224},
                {223, 224, 239},
                {210, 224, 225},
                {210, 211, 225},
                {211, 227, 228, 240},
                {212, 213, 229},
                {230, 231, 252},
                {230, 231},
                {214, 232},
                {215, 233},
                // 30
                {232, 233},
                {233, 243},
                {234, 244},
                {235, 236, 244, 245},
                {236, 237, 245},
                {237, 246},
                {247, 259},
                {221, 237, 238, 247},
                {222, 238},
                {238, 261},
                // 40
                {238, 249},
                {225, 239},
                {226, 249, 250},
                {250, 251, 262, 263},
                {227, 250, 251},
                {228, 229, 252},
                {240, 252, 264, 276},
                {231, 265},
                {232, 241},
                {241, 242},
                // 50
                {242, 253, 255},
                {242, 243, 256, 257},
                {257, 267, 268},
                {244, 257, 258},
                {245, 246, 258},
                {258, 268, 269},
                {247, 260, 261},
                {261, 271},
                {248, 262, 272},
                {249, 250, 262},
                // 60
                {263, 273},
                {263, 275},
                {263, 264},
                {264, 275},
                {277, 278},
                {265, 276},
                {278},
                {265, 278},
                {254, 255, 266},
                {255, 266, 267},
                // 70
                {267, 281},
                {268, 269, 282},
                {269, 270, 283},
                {260, 270, 271},
                {271, 284},
                {272, 284, 296},
                {272, 273, 285},
                {274, 297, 298},
                {274, 298},
                {286, 287},
                // 80
                {286},
                {266, 288},
                {279, 280},
                {281, 291},
                {281, 282},
                {291, 292},
                {292, 294},
                {283, 292, 293},
                {293, 294},
                {294, 295, 307, 308},
                // 90
                {295, 296},
                {200, 295},
                {200, 296},
                {297, 312},
                {287, 299},
                {287},
                {300},
                {277, 301},
                {301},
                {279, 288, 289},
                // 100
                {290, 303, 304},
                {280, 289, 290},
                {304, 305},
                {291, 305},
                {306, 321},
                {294, 306, 307},
                {307, 309},
                {308, 309, 310},
                {308, 311, 313},
                {200, 312},
                // 110
                {313},
                {299},
                {312, 314},
                {315},
                {314, 315},
                {315, 316},
                {301, 316},
                {302, 319},
                {302, 303},
                {304, 320},
                // 120
                {322, 330},
                {320, 321},
                {321, 323, 333},
                {306, 323},
                {323, 324},
                {324, 335},
                {325, 326, 336},
                {310, 325},
                {311, 326},
                {326, 327},
                // 130
                {313, 327},
                {328},
                {314, 317},
                {316, 317, 318},
                {319, 320, 329},
                {329, 331},
                {331, 343},
                {331, 332},
                {332},
                {322, 332, 333, 344},
                // 140
                {334, 335},
                {336, 346},
                {337, 347},
                {337},
                {348},
                {338, 348},
                {348, 349},
                {338, 339},
                {339, 349},
                {317, 339},
                // 150
                {339, 340},
                {318, 340},
                {341, 350},
                {341, 329},
                {350, 342},
                {329, 342},
                {342, 343},
                {352},
                {343},
                {352, 353},
                // 160
                {344, 354},
                {345, 355, 368},
                {345, 346},
                {355, 356},
                {346, 356},
                {347, 357},
                {347},
                {358},
                {348, 358},
                {359, 360},
                // 170
                {359, 361},
                {361, 362},
                {340, 361},
                {363, 364, 366},
                {351, 363},
                {351, 352, 364, 365, 367},
                {367, 368},
                {353, 354, 365, 368},
                {355, 369},
                {369, 370},
                // 180
                {356, 370},
                {356, 357},
                {370, 371},
                {357, 371},
                {357},
                {371, 372},
                {358, 372},
                {360, 373},
                {362, 373},
                {},
                //190
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                //200
                {91, 92, 109},
                // 201
                {1, 8, 9, 215},
                {1, 9, 11, 203},
                {12, 202, 204},
                {2, 14, 203},
                {2, 207},
                {2, 16},
                {3, 16, 17, 205},
                {3, 4, 222, 223},
                {4, 5, 20},
                {5, 22, 23},
                // 211
                {6, 23, 24},
                {6, 25, 228},
                {7, 25},
                {8, 28, 215},
                {10, 29, 201, 214},
                {10, 11, 234},
                {12, 13, 14},
                {13, 14, 15, 16},
                {17, 18, 236, 237},
                {3, 18, 221},
                //221
                {19, 37, 220},
                {19, 38, 208, 223},
                {20, 21, 208, 222},
                {20, 21, 22},
                {22, 23, 41, 226},
                {42, 225, 227},
                {24, 44, 226},
                {24, 45, 212},
                {25, 45, 230},
                {7, 26, 27, 229},
                //231
                {26, 27, 47},
                {28, 30, 48, 242},
                {29, 30, 31, 234},
                {13, 32, 216, 233},
                {13, 32, 33},
                {15, 33, 34, 219},
                {34, 35, 37, 219},
                {37, 38, 39, 40, 239, 247},
                {21, 41, 238},
                {24, 46, 251},
                //241
                {48, 49, 253},
                {49, 50, 51, 232},
                {31, 51, 244, 257},
                {32, 33, 53, 243},
                {33, 34, 54},
                {35, 54, 259},
                {36, 37, 56, 238},
                {58, 249, 261},
                {40, 42, 59, 248},
                {42, 43, 44, 59},
                //251
                {43, 44, 240},
                {26, 45, 46},
                {50, 241, 254},
                {68, 253},
                {50, 68, 69, 256},
                {51, 255, 267},
                {51, 52, 53, 243},
                {53, 54, 55, 259},
                {36, 246, 258, 270},
                {56, 73},
                //261
                {39, 56, 57, 248},
                {43, 58, 59, 273},
                {43, 60, 61, 62},
                {46, 62, 63},
                {47, 65, 67},
                {68, 69, 81, 279},
                {52, 69, 70, 256},
                {52, 55, 71},
                {55, 71, 72, 283},
                {72, 73, 259},
                //271
                {57, 73, 74, 272},
                {58, 75, 76, 271},
                {60, 76, 262, 274},
                {77, 78, 273},
                {61, 63},
                {46, 65, 277},
                {64, 97, 276, 286},
                {64, 66, 67},
                {82, 99, 266},
                {82, 101, 281},
                //281
                {70, 83, 84, 280},
                {71, 84, 292},
                {72, 87, 269},
                {74, 75, 293, 295},
                {76, 296, 297},
                {79, 80, 277},
                {79, 94, 95},
                {81, 99, 302},
                {99, 101, 303},
                {100, 101, 291},
                //291
                {83, 85, 103, 290},
                {85, 86, 87, 282},
                {87, 88, 284},
                {86, 88, 89, 105},
                {89, 90, 91, 284},
                {75, 90, 92, 285},
                {77, 93, 285},
                {77, 78},
                {94, 111, 312},
                {96, 301, 315},
                //301
                {97, 98, 116, 300},
                {117, 118, 288},
                {100, 118, 289},
                {100, 102, 119},
                {102, 103},
                {104, 105, 123},
                {89, 105, 106},
                {89, 107, 108},
                {106, 107, 325},
                {107, 127, 311},
                //311
                {108, 128, 310},
                {93, 109, 112, 299, 313},
                {108, 110, 130, 312},
                {112, 114, 132, 328},
                {113, 114, 115, 300},
                {115, 116, 133},
                {132, 133, 149},
                {133, 151},
                {117, 134},
                {119, 121, 134},
                //321
                {104, 121, 122},
                {120, 139},
                {122, 123, 124},
                {124, 125},
                {126, 127, 309},
                {126, 128, 129},
                {129, 130, 337},
                {131, 314, 338},
                {134, 135, 153, 155},
                {120, 329},
                //331
                {135, 136, 137},
                {137, 138, 139},
                {122, 139, 334},
                {140, 333, 345},
                {125, 140, 336},
                {126, 141, 335},
                {142, 143, 327},
                {145, 147, 328},
                {147, 148, 149, 150},
                {150, 151, 172},
                //341
                {152, 153},
                {154, 155, 156, 351},
                {136, 156, 158},
                {139, 160},
                {161, 162, 334},
                {141, 162, 164},
                {142, 165, 166},
                {144, 145, 146, 168},
                {146, 148, 359},
                {152, 154, 363},
                //351
                {174, 175, 342, 352},
                {157, 159, 175, 351},
                {159, 177, 354},
                {160, 177, 353},
                {161, 163, 178},
                {163, 164, 180, 181},
                {165, 181, 183, 184},
                {167, 168, 186},
                {169, 170, 349},
                {169, 187, 362},
                //361
                {170, 171, 172},
                {171, 188, 360},
                {173, 174, 350},
                {173, 175},
                {175, 177},
                {173, 189},
                {175, 176, 189},
                {161, 176, 177},
                {178, 179, 368},
                {179, 180, 182},
                //371
                {182, 183, 185},
                {185, 186, 373},
                {187, 188, 372}
        };

        this.water = new int[][] {
                {66, 98},
                {80, 95, 96, 113},
                {110, 131, 143, 144, 166, 167, 184},
                {154, 157, 158, 174}
        };

        this.one = new int[] {
                1, 2, 3, 4, 8, 9, 10, 11, 12, 13,
                14, 15, 16, 17, 18, 28, 29, 30, 31, 32,
                33, 34, 35, 36, 48, 49, 50, 51, 52, 53,
                54, 55, 68, 69, 71, 72
        };

        // water node 추가 안 됨
        this.two = new int[] {
                5, 6, 7, 23, 24, 25, 26, 27, 42, 43,
                44, 45, 46, 47, 60, 61, 62, 63, 64, 65,
                67, 77, 78, 79
        };

        this.three = new int[] {
                117, 119, 120, 121, 122, 123, 134, 135, 136, 137,
                139, 152, 153, 155, 156, 159, 161, 173, 175, 176,
                177, 178, 189
        };

        this.four = new int[] {
                129, 130, 132, 133, 142, 145, 146, 147, 148, 149,
                150, 151, 165, 168, 169, 170, 171, 172, 183, 185,
                186, 187, 188
        };

        this.marineStartList = new int[] {
                93, 94, 97, 106, 109, 200
        };

        this.sessionMap = new HashMap<>();
        this.roomMap = new HashMap<>();
        this.gameMap = new HashMap<>();

        // TEST
        test("A111", GameMode.ONE_VS_ONE);
        test("A222", GameMode.ONE_VS_THREE);
    }

    // TEST
    private void test(String gameId, GameMode gameMode) {
        this.roomMap.put(gameId, new Room(gameId));
        switch (gameMode) {
            case ONE_VS_ONE -> {
                this.roomMap.get(gameId).getInRoomPlayers().add("A");
                this.roomMap.get(gameId).getInRoomPlayers().add("B");
                this.roomMap.get(gameId).setHost("A");
                this.roomMap.get(gameId).setGameMode(GameMode.ONE_VS_ONE);
            }
            case ONE_VS_THREE -> {
                this.roomMap.get(gameId).getInRoomPlayers().add("A");
                this.roomMap.get(gameId).getInRoomPlayers().add("B");
                this.roomMap.get(gameId).getInRoomPlayers().add("C");
                this.roomMap.get(gameId).getInRoomPlayers().add("D");
                this.roomMap.get(gameId).setHost("A");
                this.roomMap.get(gameId).setGameMode(GameMode.ONE_VS_THREE);
            }
        }

        this.gameMap.put(gameId, new Game(gameId));

        switch (gameMode) {
            case ONE_VS_ONE -> {
                this.gameMap.get(gameId).getPlayers().put(0, "A");
                this.gameMap.get(gameId).getPlayers().put(1, "B");
                this.gameMap.get(gameId).getPlayers().put(2, "B");
                this.gameMap.get(gameId).getPlayers().put(3, "B");
            }
            case ONE_VS_THREE -> {
                this.gameMap.get(gameId).getPlayers().put(0, "A");
                this.gameMap.get(gameId).getPlayers().put(1, "B");
                this.gameMap.get(gameId).getPlayers().put(2, "C");
                this.gameMap.get(gameId).getPlayers().put(3, "D");
            }
        }

        this.gameMap.get(gameId).setGameStatus(GameStatus.BEFORE_START);
    }
}
