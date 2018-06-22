Math.pow(1, 2);
1 + Math.pow(1, 2);

Math.pow(1 + 1, 2 + 2);
Math.pow(<number>1, 2 as number);
Math.pow(1, Boolean() ? 1 : 2);
!Math.pow(1, 2);
Math.pow(1, 2).toString();
<number>Math.pow(1, 2);

declare var args: [number, number];
Math.pow(...args);
Math.pow(1);
Math.pow(1, ...[2]);

declare namespace foo {
    function pow(a: number, b: number): number;
}

foo.pow(1, 2);