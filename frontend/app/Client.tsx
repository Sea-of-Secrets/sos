"use client";

import Button from "~/_lib/components/Button";
import { useFetch } from "~/_lib/hooks/useFetch";
import * as ShopsApi from "~/app/api/shops";

export default function Client() {
  // const {
  //   loading: getProductListLoading,
  //   fetch: handleClickGetProductList,
  //   data: productList,
  // } = useFetch(ShopApi.getProductList);

  return (
    <div>
      <Button onClick={() => window.alert("아직 기능 안넣었지롱")}>
        방 만들기
      </Button>
      <Button onClick={() => window.alert("아직 기능 안넣었지롱")}>
        방 입장하기
      </Button>
      {/* <Button
        onClick={handleClickGetProductList}
        disabled={getProductListLoading}
      >
        {getProductListLoading
          ? "loading..."
          : "모든 상품 목록 가져오기 API TEST"}
      </Button>
      <div>
        가져온 상품 목록 배열의 길이 : {productList ? productList.length : "X"}
      </div> */}
    </div>
  );
}
