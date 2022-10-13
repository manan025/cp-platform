#include "testlib.h"

int main(int argc, char* argv[]) {
    registerValidation(argc, argv);
    int testCount = inf.readInt(1, 100, "testCount");
    inf.readEoln();
    
    for (int i = 0; i < testCount; i++) {
        setTestCase(i + 1);
        int n = inf.readInt(1, 100'000'000, "L");
        inf.readSpace();
        inf.readInt(1, 100'000'000, "M");
        inf.readSpace();
        inf.readInt(1, 100'000'000, "N");
        inf.readEoln();
    }

    inf.readEof();
}