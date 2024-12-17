# serperAgent

## Description

serper agent

## Schema

#### inputs

```json

{
  "$schema": "http://json-schema.org/draft-04/schema#",
  "description": "",
  "type": "object",
  "properties": {
    "query": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "query"
  ]
}

````

## Input example of the next node

```json

[
  ":agentId",
  ":agentId.searchParameters",
  ":agentId.searchParameters.q",
  ":agentId.searchParameters.type",
  ":agentId.searchParameters.engine",
  ":agentId.knowledgeGraph",
  ":agentId.knowledgeGraph.title",
  ":agentId.knowledgeGraph.type",
  ":agentId.knowledgeGraph.website",
  ":agentId.knowledgeGraph.imageUrl",
  ":agentId.knowledgeGraph.description",
  ":agentId.knowledgeGraph.descriptionSource",
  ":agentId.knowledgeGraph.descriptionLink",
  ":agentId.knowledgeGraph.attributes",
  ":agentId.knowledgeGraph.attributes.Customer service",
  ":agentId.knowledgeGraph.attributes.Founders",
  ":agentId.knowledgeGraph.attributes.Headquarters",
  ":agentId.knowledgeGraph.attributes.CEO",
  ":agentId.knowledgeGraph.attributes.CFO",
  ":agentId.knowledgeGraph.attributes.Founded",
  ":agentId.organic",
  ":agentId.organic.$0",
  ":agentId.organic.$0.title",
  ":agentId.organic.$0.link",
  ":agentId.organic.$0.snippet",
  ":agentId.organic.$0.sitelinks",
  ":agentId.organic.$0.sitelinks.$0",
  ":agentId.organic.$0.sitelinks.$0.title",
  ":agentId.organic.$0.sitelinks.$0.link",
  ":agentId.organic.$0.sitelinks.$1",
  ":agentId.organic.$0.sitelinks.$1.title",
  ":agentId.organic.$0.sitelinks.$1.link",
  ":agentId.organic.$0.sitelinks.$2",
  ":agentId.organic.$0.sitelinks.$2.title",
  ":agentId.organic.$0.sitelinks.$2.link",
  ":agentId.organic.$0.sitelinks.$3",
  ":agentId.organic.$0.sitelinks.$3.title",
  ":agentId.organic.$0.sitelinks.$3.link",
  ":agentId.organic.$0.sitelinks.$4",
  ":agentId.organic.$0.sitelinks.$4.title",
  ":agentId.organic.$0.sitelinks.$4.link",
  ":agentId.organic.$0.position",
  ":agentId.organic.$1",
  ":agentId.organic.$1.title",
  ":agentId.organic.$1.link",
  ":agentId.organic.$1.snippet",
  ":agentId.organic.$1.sitelinks",
  ":agentId.organic.$1.sitelinks.$0",
  ":agentId.organic.$1.sitelinks.$0.title",
  ":agentId.organic.$1.sitelinks.$0.link",
  ":agentId.organic.$1.sitelinks.$1",
  ":agentId.organic.$1.sitelinks.$1.title",
  ":agentId.organic.$1.sitelinks.$1.link",
  ":agentId.organic.$1.sitelinks.$2",
  ":agentId.organic.$1.sitelinks.$2.title",
  ":agentId.organic.$1.sitelinks.$2.link",
  ":agentId.organic.$1.sitelinks.$3",
  ":agentId.organic.$1.sitelinks.$3.title",
  ":agentId.organic.$1.sitelinks.$3.link",
  ":agentId.organic.$1.position",
  ":agentId.organic.$2",
  ":agentId.organic.$2.title",
  ":agentId.organic.$2.link",
  ":agentId.organic.$2.snippet",
  ":agentId.organic.$2.position",
  ":agentId.organic.$3",
  ":agentId.organic.$3.title",
  ":agentId.organic.$3.link",
  ":agentId.organic.$3.snippet",
  ":agentId.organic.$3.position",
  ":agentId.organic.$4",
  ":agentId.organic.$4.title",
  ":agentId.organic.$4.link",
  ":agentId.organic.$4.snippet",
  ":agentId.organic.$4.position",
  ":agentId.organic.$5",
  ":agentId.organic.$5.title",
  ":agentId.organic.$5.link",
  ":agentId.organic.$5.snippet",
  ":agentId.organic.$5.position",
  ":agentId.organic.$6",
  ":agentId.organic.$6.title",
  ":agentId.organic.$6.link",
  ":agentId.organic.$6.snippet",
  ":agentId.organic.$6.sitelinks",
  ":agentId.organic.$6.sitelinks.$0",
  ":agentId.organic.$6.sitelinks.$0.title",
  ":agentId.organic.$6.sitelinks.$0.link",
  ":agentId.organic.$6.sitelinks.$1",
  ":agentId.organic.$6.sitelinks.$1.title",
  ":agentId.organic.$6.sitelinks.$1.link",
  ":agentId.organic.$6.sitelinks.$2",
  ":agentId.organic.$6.sitelinks.$2.title",
  ":agentId.organic.$6.sitelinks.$2.link",
  ":agentId.organic.$6.sitelinks.$3",
  ":agentId.organic.$6.sitelinks.$3.title",
  ":agentId.organic.$6.sitelinks.$3.link",
  ":agentId.organic.$6.position",
  ":agentId.peopleAlsoAsk",
  ":agentId.peopleAlsoAsk.$0",
  ":agentId.peopleAlsoAsk.$0.question",
  ":agentId.peopleAlsoAsk.$0.snippet",
  ":agentId.peopleAlsoAsk.$0.title",
  ":agentId.peopleAlsoAsk.$0.link",
  ":agentId.peopleAlsoAsk.$1",
  ":agentId.peopleAlsoAsk.$1.question",
  ":agentId.peopleAlsoAsk.$1.snippet",
  ":agentId.peopleAlsoAsk.$1.title",
  ":agentId.peopleAlsoAsk.$1.link",
  ":agentId.peopleAlsoAsk.$2",
  ":agentId.peopleAlsoAsk.$2.question",
  ":agentId.peopleAlsoAsk.$2.snippet",
  ":agentId.peopleAlsoAsk.$2.title",
  ":agentId.peopleAlsoAsk.$2.link",
  ":agentId.peopleAlsoAsk.$3",
  ":agentId.peopleAlsoAsk.$3.question",
  ":agentId.peopleAlsoAsk.$3.snippet",
  ":agentId.peopleAlsoAsk.$3.title",
  ":agentId.peopleAlsoAsk.$3.link",
  ":agentId.relatedSearches",
  ":agentId.relatedSearches.$0",
  ":agentId.relatedSearches.$0.query",
  ":agentId.relatedSearches.$1",
  ":agentId.relatedSearches.$1.query",
  ":agentId.relatedSearches.$2",
  ":agentId.relatedSearches.$2.query",
  ":agentId.relatedSearches.$3",
  ":agentId.relatedSearches.$3.query",
  ":agentId.relatedSearches.$4",
  ":agentId.relatedSearches.$4.query",
  ":agentId.relatedSearches.$5",
  ":agentId.relatedSearches.$5.query",
  ":agentId.relatedSearches.$6",
  ":agentId.relatedSearches.$6.query",
  ":agentId.relatedSearches.$7",
  ":agentId.relatedSearches.$7.query",
  ":agentId.relatedSearches.$8",
  ":agentId.relatedSearches.$8.query",
  ":agentId.credits"
]

````

## Samples

### Sample0

#### inputs

```json

{
  "query": "apple inc"
}

````

#### params

```json

{}

````

#### result

```json

{
  "searchParameters": {
    "q": "apple inc",
    "type": "search",
    "engine": "google"
  },
  "knowledgeGraph": {
    "title": "Apple",
    "type": "Technology company",
    "website": "http://www.apple.com/",
    "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwGQRv5TjjkycpctY66mOg_e2-npacrmjAb6_jAWhzlzkFE3OTjxyzbA&s=0",
    "description": "Apple Inc. is an American multinational corporation and technology company headquartered and incorporated in Cupertino, California, in Silicon Valley. It is best known for its consumer electronics, software, and services.",
    "descriptionSource": "Wikipedia",
    "descriptionLink": "https://en.wikipedia.org/wiki/Apple_Inc.",
    "attributes": {
      "Customer service": "1 (800) 275-2273",
      "Founders": "Steve Jobs, Steve Wozniak, and Ronald Wayne",
      "Headquarters": "Cupertino, CA",
      "CEO": "Tim Cook (Aug 24, 2011–)",
      "CFO": "Luca Maestri",
      "Founded": "April 1, 1976, Los Altos, CA"
    }
  },
  "organic": [
    {
      "title": "Apple",
      "link": "https://www.apple.com/",
      "snippet": "Discover the innovative world of Apple and shop everything iPhone, iPad, Apple Watch, Mac, and Apple TV, plus explore accessories, entertainment, ...",
      "sitelinks": [
        {
          "title": "Support",
          "link": "https://support.apple.com/"
        },
        {
          "title": "Careers at Apple",
          "link": "https://www.apple.com/careers/us/"
        },
        {
          "title": "Contact Apple",
          "link": "https://www.apple.com/contact/"
        },
        {
          "title": "Store",
          "link": "https://www.apple.com/store"
        },
        {
          "title": "Investor Relations",
          "link": "https://investor.apple.com/investor-relations/default.aspx"
        }
      ],
      "position": 1
    },
    {
      "title": "Apple Inc. - Wikipedia",
      "link": "https://en.wikipedia.org/wiki/Apple_Inc.",
      "snippet": "Apple Inc. is an American multinational corporation and technology company headquartered and incorporated in Cupertino, California, in Silicon Valley.",
      "sitelinks": [
        {
          "title": "History",
          "link": "https://en.wikipedia.org/wiki/History_of_Apple_Inc."
        },
        {
          "title": "List of Apple products",
          "link": "https://en.wikipedia.org/wiki/List_of_Apple_products"
        },
        {
          "title": "Litigation involving Apple Inc.",
          "link": "https://en.wikipedia.org/wiki/Litigation_involving_Apple_Inc."
        },
        {
          "title": "Apple Park",
          "link": "https://en.wikipedia.org/wiki/Apple_Park"
        }
      ],
      "position": 2
    },
    {
      "title": "Apple Inc. | History, Products, Headquarters, & Facts - Britannica",
      "link": "https://www.britannica.com/money/Apple-Inc",
      "snippet": "Apple Inc. is an American multinational technology company that revolutionized the technology sector through its innovation of computer software, ...",
      "position": 3
    },
    {
      "title": "Apple Inc. (AAPL) Company Profile & Facts - Yahoo Finance",
      "link": "https://finance.yahoo.com/quote/AAPL/profile/",
      "snippet": "(408) 996-1010 https://www.apple.com. Sector: Technology. Industry: Consumer Electronics. Full Time Employees: 164,000. Description. Apple Inc. designs ...",
      "position": 4
    },
    {
      "title": "AAPL: Apple Inc Stock Price Quote - NASDAQ GS - Bloomberg",
      "link": "https://www.bloomberg.com/quote/AAPL:US",
      "snippet": "Stock analysis for Apple Inc (AAPL:NASDAQ GS) including stock price, stock chart, company news, key statistics, fundamentals and company profile.",
      "position": 5
    },
    {
      "title": "Apple Inc. (AAPL) Stock Price Today - WSJ",
      "link": "https://www.wsj.com/market-data/quotes/AAPL",
      "snippet": "Apple Inc. engages in the design, manufacture, and sale of smartphones, personal computers, tablets, wearables and accessories, and other varieties of related ...",
      "position": 6
    },
    {
      "title": "Apple Inc. (AAPL) Stock Price, News, Quote & History - Yahoo Finance",
      "link": "https://finance.yahoo.com/quote/AAPL/",
      "snippet": "Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide. The company offers iPhone, ...",
      "sitelinks": [
        {
          "title": "Profile",
          "link": "https://finance.yahoo.com/quote/AAPL/profile/"
        },
        {
          "title": "Statistics",
          "link": "https://finance.yahoo.com/quote/AAPL/key-statistics/"
        },
        {
          "title": "Chart",
          "link": "https://finance.yahoo.com/quote/AAPL/chart/"
        },
        {
          "title": "News",
          "link": "https://finance.yahoo.com/quote/AAPL/news/"
        }
      ],
      "position": 7
    }
  ],
  "peopleAlsoAsk": [
    {
      "question": "What is the Apple Inc?",
      "snippet": "\"Inc.\" in Apple Inc. stands for \"Incorporated\".",
      "title": "What does the 'Inc.' in Apple Inc. mean? - Quora",
      "link": "https://www.quora.com/What-does-the-Inc-in-Apple-Inc-mean"
    },
    {
      "question": "Who owns Apple Inc?",
      "snippet": "Apple (AAPL) Ownership Overview The ownership structure of Apple (AAPL) stock is a mix of institutional, retail, and individual investors. Approximately 49.07% of the company's stock is owned by Institutional Investors, 0.06% is owned by Insiders, and 50.87% is owned by Public Companies and Individual Investors.",
      "title": "Who owns Apple? AAPL Stock Ownership - TipRanks.com",
      "link": "https://www.tipranks.com/stocks/aapl/ownership"
    },
    {
      "question": "Why did Apple change to Apple Inc?",
      "snippet": "During his keynote speech at the Macworld Expo on January 9, 2007, Jobs announced the renaming of Apple Computer, Inc. to Apple Inc., because the company had broadened its focus from computers to consumer electronics. This event also saw the announcement of the iPhone and the Apple TV.",
      "title": "Apple Inc. - Wikipedia",
      "link": "https://en.wikipedia.org/wiki/Apple_Inc."
    },
    {
      "question": "What is Apple Inc known for?",
      "snippet": "Apple Inc. is an American multinational technology company that revolutionized the technology sector through its innovation of computer software, personal computers, mobile tablets, smartphones, and computer peripherals.",
      "title": "Apple Inc. | History, Products, Headquarters, & Facts - Britannica",
      "link": "https://www.britannica.com/money/Apple-Inc"
    }
  ],
  "relatedSearches": [
    {
      "query": "Find My iPhone"
    },
    {
      "query": "apple inc คืออะไร"
    },
    {
      "query": "Apple Inc full form"
    },
    {
      "query": "Apple company history"
    },
    {
      "query": "Apple company owner"
    },
    {
      "query": "Apple Inc website"
    },
    {
      "query": "Apple Inc usa"
    },
    {
      "query": "Apple Inc address"
    },
    {
      "query": "Apple Inc industry"
    }
  ],
  "credits": 1
}

````

## Author

isamu arimoto

## Repository

https://github.com/receptron/graphai-agents/tree/main/net/serper-agent

## License

MIT

