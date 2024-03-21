SOURCES = $(wildcard src/*.svelte)
TARGETS = $(SOURCES:src/%.svelte=dist/%.js)
all: $(TARGETS)

dist/%.js: src/%.svelte
	npx --no-install svelte-compiler-cli --infile $^ --outfile=$@
