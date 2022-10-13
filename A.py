import sys

readline = sys.stdin.buffer.readline
read = sys.stdin.buffer.read

def main(a, b, c):
    INF = 1 << 60
    ANS = INF
    for _ in range(3):
        a, b, c = b, c, a
        if a % 3 != b % 3:
            continue
        ANS = min(ANS, max(a, b))
    if ANS == INF:
        ANS = -1
    print(ANS)

Q = int(readline())
for _ in range(Q):
    a, b, c = map(int, readline().split())
    main(a, b, c)