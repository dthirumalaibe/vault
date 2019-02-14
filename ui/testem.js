const config = {
  framework: 'qunit',
  test_page: 'tests/index.html?hidepassed',
  tap_quiet_logs: true,
  disable_watching: true,
  timeout: 1200,
  browser_start_timeout: 2000,
  parallel: 2,
  launchers: {
    BS_Chrome_Current: {
      exe: 'node_modules/.bin/browserstack-launch',
      args: [
        '--os',
        'Windows',
        '--osv',
        '10',
        '--b',
        'chrome',
        '--bv',
        'latest',
        '-t',
        '600',
        '--u',
        '<url>',
      ],
      protocol: 'browser',
    },
    BS_Firefox_Current: {
      exe: 'node_modules/.bin/browserstack-launch',
      args: [
        '--os',
        'Windows',
        '--osv',
        '10',
        '--b',
        'firefox',
        '--bv',
        'latest',
        '-t',
        '600',
        '--u',
        '<url>',
      ],
      protocol: 'browser',
    },
    BS_Safari_Current: {
      exe: 'node_modules/.bin/browserstack-launch',
      args: [
        '--os',
        'OS X',
        '--osv',
        'Mojave',
        '--b',
        'safari',
        '--bv',
        'latest',
        '-t',
        '600',
        '--u',
        '<url>',
      ],
      protocol: 'browser',
    },
    BS_IE_11: {
      exe: 'node_modules/.bin/browserstack-launch',
      args: [
        '--os',
        'Windows',
        '--osv',
        '10',
        '--b',
        'ie',
        '--bv',
        '11.0',
        '-t',
        '1500',
        '--u',
        '<url>&legacy=true',
      ],
      protocol: 'browser',
    },
  },
  launch_in_dev: [],
  launch_in_ci: ['BS_Chrome_Current', 'BS_Firefox_Current', 'BS_Safari_Current', 'BS_IE_11'],
  on_exit:
    '[ -e ../../vault-ui-integration-server.pid ] && node ../../scripts/start-vault.js `cat ../../vault-ui-integration-server.pid`; [ -e ../../vault-ui-integration-server.pid ] && rm ../../vault-ui-integration-server.pid',
  proxies: {
    '/v1': {
      target: 'http://localhost:9200',
    },
  },
};

if (process.env.CI) {
  config.reporter = 'xunit';
  config.report_file = 'test-reports/ember.xml';
  config.xunit_intermediate_output = true;
}

module.exports = config;
