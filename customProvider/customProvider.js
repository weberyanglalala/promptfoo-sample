// const promptfoo = require('../../dist/src/index.js').default;
const promptfoo = require('promptfoo').default;

class CustomApiProvider {
  constructor(options) {
    // The caller may override Provider ID (e.g. when using multiple instances of the same provider)
    this.providerId = options.id || 'custom provider';

    // The config object contains any options passed to the provider in the config file.
    this.config = options.config;
  }

  id() {
    return this.providerId;
  }

  async callApi(prompt) {
    const body = {
        "inputs": {
            "query": prompt,
        },
        "response_mode": "blocking",
        "user": "abc-04201749"
    };

    // Fetch the data from the API using promptfoo's cache. You can use your own fetch implementation if preferred.
    const { data, cached } = await promptfoo.cache.fetchWithCache(
      'https://aiclass.buildschool.dev/v1/workflows/run',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.AICLASS_API_KEY}`,
        },
        body: JSON.stringify(body),
      },
      10_000 /* 10 second timeout */,
    );

    const ret = {
      output: data.data.outputs.text
    };
    return ret;
  }
}

module.exports = CustomApiProvider;