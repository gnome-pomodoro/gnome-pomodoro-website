YARN = yarn --non-interactive
RM = rm

BUILD_FILES = \
	assets/main.bundle.js

DEPS_STAMP = \
	.deps.stamp


all: build

$(DEPS_STAMP):
	$(YARN) install --dev --flat && touch $@
deps: $(DEPS_STAMP)

build:
	$(YARN) run build
$(BUILD_FILES): deps build

run: build
	$(YARN) run dev-server

clean:
	$(RM) -f $(DEPS_STAMP) $(BUILD_STAMP)

.PHONY: deps build run clean
