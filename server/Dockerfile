FROM ruby:3.1.0-slim
RUN apt-get update -qq && apt-get install -yq --no-install-recommends \
    build-essential \
    postgresql-client \
    libpq-dev \
    libvips42 \
    imagemagick \
    ffmpeg \
  && apt-get autoremove -y \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* \

RUN mkdir /app
WORKDIR /app
COPY Gemfile .
RUN bundle install
COPY . .
CMD ["rails", "s"]
