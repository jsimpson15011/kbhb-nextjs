import useSWR from "swr"
import {baseUrl} from "../site-settings"

export const fetcher = (...args) => fetch(...args).then(res => res.json())

export function useNav () {
  const { data, error } = useSWR(`${baseUrl}/wp-json/menus/v1/menus/main-navigation`, fetcher)

  return {
    data: data,
    isLoading: !error && !data,
    isError: error
  }
}

export function useBannerAds () {
  const { data, error } = useSWR(`${baseUrl}/wp-json/wp/v2/banner_ad?_embed&per_page=10`, fetcher)

  return {
    data: data,
    isLoading: !error && !data,
    isError: error
  }
}
