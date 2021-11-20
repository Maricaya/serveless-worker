const dir = {
  ETH: 1027,
  BNB: 1839,
}

const numItem: number[] = [];

for (const item in dir) {
  numItem.push(dir[item as keyof typeof dir])
}

// 1. 写法
// interface ICoinWrapper {
//   status: Record<string, string>
//   data: {[key in keyof typeof dir]: ICoin}
// }

type ElementType<T extends ReadonlyArray<unknown>> =
  T extends ReadonlyArray<infer A>
    ? A : never;

// type GetValue<T> = {
//   [P in keyof T]: T[P]
// }[keyof T]

export interface IData<T extends ReadonlyArray<PropertyKey>> {
  // data: {[key in keyof typeof dir]: ICoin}
  data: {
    [key in ElementType<T>]: ICoin
  }
}

interface ICoin {
  symbol: keyof typeof dir
  quote: {
    USDT: {
      price: number
    }
  }
}

const Bid = [1027, 1839] as const

type BidResponseType = IData<typeof Bid>

async function handleIcon () {
  const response = await fetch(
    'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?id=1027,1839&CMC_PRO_API_KEY=b589e2e5-b041-46f5-8691-b471798888ec&convert=USDT',
  )

  const res = await response.json<BidResponseType>()

  const map = {} as Record<keyof typeof dir, number>;

  map.ETH = res.data[1027].quote.USDT.price
  map.BNB = res.data[1839].quote.USDT.price

  // for (const key in res) {
  //   const coin = res[key]
  //   const coinName = coin.symbol
  //   const coinPrice = coin.quote.USDT.price
  //   await KV_FROM_RUST.put(coinName, coinPrice)
  //   map[coinName] = coinPrice
  // }
  return map as typeof dir
}

export async function handleRequest(): Promise<Response> {
  const res = await handleIcon();
  await KV_FROM_RUST.put("ETH", "111")

 return new Response(JSON.stringify(res), {
    headers: {
      'content-type': 'application/json;charset=UTF-8',
    },
  })
}

export async function handleSchedule() {
  await handleIcon();
  console.log("icon")
}