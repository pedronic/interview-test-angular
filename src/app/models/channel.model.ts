export default class Channel {
  id: number;
  user: User;
  status: string;
  constructor(object?: Partial<Channel>){
    this.id = object?.id;
    this.user = object?.user;
    this.status = object?.status;
  }
}

interface User {
  pk: number;
  username: string;
  full_name: string;
  is_private: boolean;
  profile_pic_url: string;
  profile_pic_id: string;
  is_verified: boolean;
  has_anonymous_profile_picture: boolean;
  media_count: number;
  follower_count: number;
  following_count: number;
  following_tag_count: number;
  biography: string;
  can_link_entities_in_bio: boolean;
  biography_with_entities: Biographywithentities;
  biography_product_mentions: any[];
  external_url: string;
  external_lynx_url: string;
  can_boost_post: boolean;
  can_see_organic_insights: boolean;
  show_insights_terms: boolean;
  can_convert_to_business: boolean;
  can_create_sponsor_tags: boolean;
  is_allowed_to_create_standalone_nonprofit_fundraisers: boolean;
  is_allowed_to_create_standalone_personal_fundraisers: boolean;
  can_create_new_standalone_fundraiser: boolean;
  can_create_new_standalone_personal_fundraiser: boolean;
  can_be_tagged_as_sponsor: boolean;
  can_see_support_inbox: boolean;
  can_see_support_inbox_v1: boolean;
  total_igtv_videos: number;
  has_igtv_series: boolean;
  total_clips_count: number;
  has_saved_items: boolean;
  total_ar_effects: number;
  reel_auto_archive: string;
  is_profile_action_needed: boolean;
  usertags_count: number;
  usertag_review_enabled: boolean;
  is_needy: boolean;
  is_interest_account: boolean;
  has_chaining: boolean;
  hd_profile_pic_url_info: Hdprofilepicurlinfo;
  has_placed_orders: boolean;
  can_tag_products_from_merchants: boolean;
  fbpay_experience_enabled: boolean;
  show_conversion_edit_entry: boolean;
  aggregate_promote_engagement: boolean;
  allowed_commenter_type: string;
  is_video_creator: boolean;
  has_profile_video_feed: boolean;
  has_highlight_reels: boolean;
  has_guides: boolean;
  is_eligible_to_show_fb_cross_sharing_nux: boolean;
  page_id_for_new_suma_biz_account?: any;
  eligible_shopping_signup_entrypoints: any[];
  service_shop_onboarding_status?: any;
  service_shop_merchant_entrypoint_app_id: string;
  can_be_reported_as_fraud: boolean;
  is_business: boolean;
  account_type: number;
  professional_conversion_suggested_account_type: number;
  is_call_to_action_enabled?: any;
  interop_messaging_user_fbid: number;
  linked_fb_info: Linkedfbinfo;
  standalone_fundraiser_info: Standalonefundraiserinfo;
  allow_mention_setting: string;
  allow_tag_setting: string;
  can_see_primary_country_in_settings: boolean;
  personal_account_ads_page_name: string;
  personal_account_ads_page_id: string;
  account_badges: any[];
  whatsapp_number: string;
  has_eligible_whatsapp_linking_category?: any;
  fbid_v2: number;
  is_eligible_for_appointment_creation_in_direct_thread: boolean;
  include_direct_blacklist_status: boolean;
  can_follow_hashtag: boolean;
  is_potential_business: boolean;
  show_post_insights_entry_point: boolean;
  feed_post_reshare_disabled: boolean;
  besties_count: number;
  show_besties_badge: boolean;
  recently_bestied_by_count: number;
  nametag: Nametag;
  existing_user_age_collection_enabled: boolean;
  about_your_account_bloks_entrypoint_enabled: boolean;
  auto_expand_chaining: boolean;
  highlight_reshare_disabled: boolean;
  is_memorialized: boolean;
  open_external_url_with_in_app_browser: boolean;
}

interface Nametag {
  mode: number;
  gradient: number;
  emoji: string;
  selfie_sticker: number;
}

interface Standalonefundraiserinfo {
  has_active_fundraiser: boolean;
  fundraiser_id?: any;
  fundraiser_title?: any;
  fundraiser_type?: any;
  formatted_goal_amount?: any;
  beneficiary_username?: any;
  formatted_fundraiser_progress_info_text?: any;
  percent_raised?: any;
}

interface Linkedfbinfo {
  linked_fb_user: Linkedfbuser;
}

interface Linkedfbuser {
  id: number;
  name: string;
  is_valid: boolean;
}

interface Hdprofilepicurlinfo {
  url: string;
  width: number;
  height: number;
}

interface Biographywithentities {
  raw_text: string;
  entities: any[];
}
