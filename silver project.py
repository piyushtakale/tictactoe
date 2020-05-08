#!/usr/bin/env python
# coding: utf-8

# In[ ]:


from IPython.display import clear_output

board = ["", "", "", "", "", "", "", "", "", ""]
jaga = []
cursymbol = ""
ins=[1,2,3,4,5,6,7,8,9]
clear = lambda: os.system("cls")
winner = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]
validsymbol = ["X", "x", "O", "o"]

def clearboard(board):
    board=["", "", "", "", "", "", "", "", "", ""]
    return board
def printboard(board):
    print(board[0], "|", board[1], "|", board[2])
    print("----------")
    print(board[3], "|", board[4], "|", board[5])
    print("----------")
    print(board[6], "|", board[7], "|", board[8])





def takeinput():
    i = int(input("enter position"))
    return i


def checkresult(board):
    for els in range(len(winner)):
        if (board[winner[els][0]] != "" and board[winner[els][0]] == board[winner[els][1]] and board[winner[els][0]] ==
                board[winner[els][2]]):
            return board[winner[els][0]]

    return ""


def swapuser(cursymbol):
    if (cursymbol == "X" or cursymbol == "x"):
        cursymbol = "O"
        return cursymbol;
    else:
        cursymbol = "X"
        return cursymbol


def game():
    ans="yes"
    while ans=="yes" or ans=='y' or ans=='Y' :
        board = ["", "", "", "", "", "", "", "", "", ""]
        jaga.clear()
        i = 0
        first = input("enter the first symbol")
        if (validsymbol.count(first) > 0):
            while (i < 9):
                while "true":
                    j = takeinput()
                    print(j)
                    if jaga.count(j)>0 or j>=10 or j<=0:
                        print("invalid input please enter number from 1-9 and available spots")
                    else:
                        break

                board[j - 1] = first.upper()
                jaga.append(j)    
                clear_output(wait=True)

                print(printboard(board))
                won = checkresult(board)
                if (won != ""):
                    print(won, "is winner")
                    break
                if (i == 8):
                    print("game tied")

                first = swapuser(first)
                i += 1
        ans=input("do you want to play game again y/n?")

game()


# In[ ]:


file = open("tictactoe.py","w")


# In[ ]:




