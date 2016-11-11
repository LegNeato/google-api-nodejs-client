/* @generated - do not edit directly */
/* @flow */
{% spaceless %}
{% set Name = name|capitalize %}
{% set Version = version|replace('\.', '_')|capitalize %}
{% set Namespace = [Name, Version]|join('') %}
{%- endspaceless -%}

import type {
  $Request,
  $Response,
} from 'express';
import type {
  $ProxyResponse,
} from 'express-http-proxy';

export type ShimHandler = (
  googleResponse: $ProxyResponse, // Response from Google.
  googleData: Object, // Response data from Google. Handlers cast to specific type.
  requestToPocketship: $Request, // Original request to pocketship from client.
  responseFromPocketship: $Response, // Response Pocketship is sending back to client.
  handlerId: string,
) => Promise<?Error>;

const handlers: { [key: string]: ShimHandler } = {};

{% if resources %}
{% for rname, r in resources %}
  /**
   * {{ rname|capitalize }}
   */
  {%- include "./handler-partial.js" with r -%}
{%- endfor -%}
{%- endif %}

export default handlers;
