# Textualize

[![Circle
CI](https://circleci.com/gh/q-centrix/textualize.svg?style=svg)](https://circleci.com/gh/q-centrix/textualize)

A documentation template written in RAML and thor tasks to turn documentation
into so much more.

## Installation

Add this line to your application's Gemfile:

```ruby
gem 'textualize'
```

## Usage

Textualize comes with the following generators:

### New

```bash
textualize new <folder-name>
```

The ``textualize new`` command creates sample documentation with the folder
structure needed for the other commands.

### Server

```bash
textualize server
```

The ``textualize server`` command creates a folder structure of JSON in the
``dist/server`` folder.

### HttpBackend

```bash
textualize http_backend
```

The ``textualize http_backend`` command creates a minified javascript file,
``dist/angular/backend/fake_http_backend.min.js`` that contains an angular module that
can be injected to provide a stubbed
[httpBackend](https://docs.angularjs.org/api/ngMockE2E/service/$httpBackend).
This can be used in both e2e tests and for prototyping.

### Request Specs

```bash
textualize request_specs
```

The ``textualize request_specs`` command creates a folder of request specs
written in [airborne](https://github.com/brooklynDev/airborne) at 
``dist/spec/request_specs`` that can be used writing ruby apps with Rack. 
It is recommended that tests are run in isolation while developing, and 
as a suite in continuous integration.

## Development

After checking out the repo, run `bin/setup` to install dependencies. Then, run
`bin/console` for an interactive prompt that will allow you to experiment.

To install this gem onto your local machine, run `bundle exec rake install`. To
release a new version, update the version number in `version.rb`, and then run
`bundle exec rake release` to create a git tag for the version, push git
commits and tags, and push the `.gem` file to
[rubygems.org](https://rubygems.org).

## Contributing

1. Fork it ( https://github.com/[my-github-username]/textualize/fork )
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create a new Pull Request
