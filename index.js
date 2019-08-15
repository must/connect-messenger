/**
 *
 * so this is where you define the package details for CONNECT platform.
 * these details are confined to 'module.exports.platform', to allow for packages
 * that would work outside of the context of CONNECT platform as well.
 *
 */
module.exports.platform = {
  /**
   *
   * these are the configurations of your package.
   *
   */
  config: {
    /**
     *
     * these are the nodes introduced by your package.
     * you should specify the nodes your package offers based on
     * their type. node types can be one of the following:
     *
     * - native: i.e. nodes written in javascript.
     * - json: i.e. nodes generated by CONNECT platform itself.
     * - module: i.e. other CONNECT packages your package is dependant on. these can
     *          be included locally or can be external packages, in which case the platform
     *          will try to fetch and install them upon initialization.
     *
     */
    nodes : {
      /**
       *
       * reference native modules (and json modules as well) relative to root of your
       * package, without the extension.
       *
       */
      native : [
        '/client/getMessagingInsights',
        '/webhook/post',
        '/webhook/get',
       ]
    },
    /**
     *
     * aliases help you declare more generic addresses for your nodes.
     * for example, you might be aliasing '/firestore/insert' to '/db/insert',
     * so that other nodes and packages of the user will be using them without
     * being aware that 'db' is actually 'firestore'.
     *
     */
    aliases: {
      '/messaging/client/getMessagingInsights': '/fb/messaging/client/getMessagingInsights',
      '/messaging/webhook': '/fb/messaging/webhook',
    }
  },
  hints: {
    setup:
  `Should work if you provide the correct configuration as shown below.<br>
  Otherwise, check the sample configuration below and <a href="https://github.com/amuramoto/messenger-node#readme">this page</a> for a more detailled description on all the options.`,
  sampleConfig: {
      "messenger": {
        "credentials": {
          "page_token": "<PAGE TOKEN>",
          "app_token": "<APP TOKEN>",
          "api_version": "<API version / example: v2.11>",
          "verify_token": "<VERIFY_token>"
        },
        "callback_nodes": {
          "message": "/callback/message",
          "messaging_postback": "/callback/messaging_postback",
          "messaging_account_linking": "/callback/messaging_account_linking",
          "messaging_checkout_updates": "/callback/messaging_checkout_updates",
          "message_deliveries": "/callback/message_deliveries",
          "message_echoes": "/callback/message_echoes",
          "messaging_game_plays": "/callback/messaging_game_plays",
          "messaging_handovers": "/callback/messaging_handovers",
          "messaging_optins": "/callback/messaging_optins",
          "messaging_payments": "/callback/messaging_payments",
          "messaging_policy_enforcement": "/callback/messaging_policy_enforcement",
          "messaging_optins": "/callback/messaging_optins",
          "messaging_pre_checkouts": "/callback/messaging_pre_checkouts",
          "message_reads": "/callback/message_reads",
          "messaging_referrals": "/callback/messaging_referrals",
          "messaging_standby": "/callback/messaging_standby"
        }
      }
    }
  }
}
