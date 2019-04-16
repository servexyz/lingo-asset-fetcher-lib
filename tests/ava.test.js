import test from "ava";

test("ava is working", t => {
	t.pass();
});

test("es2017 in ava is working", async t => {
	const bar = Promise.resolve("bar");

	t.is(await bar, "bar");
});
