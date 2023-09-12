import { NextFunction } from 'express';
const ethController = require('./Controller/ethController');
const db = require('./database/querys');

type MethodType = {
  router: string;
  function: string;
  columnName?: string;
  params: any;
};

const handleGetMethod = async (method: MethodType, contractAddress: any) => {
  const data = await ethController[method.function](
    contractAddress,
    ...Object.values(method.params)
  );
  console.log(data);
};

const handleUpdateMethod = async (
  method: MethodType,
  paramsValue: string | undefined
) => {
  const result = await db.selectContract(method.columnName, paramsValue);
  await ethController[method.function](
    result.contractAddress,
    ...Object.values(method.params)
  );
};

const handlerRoutes = async (
  url: any,
  httpMethod: any,
  routesParams: MethodType[]
) => {
  const splitUrl = url.toString().split('/');

  for (const routeParam of routesParams) {
    if (routeParam.router === splitUrl[1]) {
      if (splitUrl.length > 2) {
        try {
          if (httpMethod === 'GET') {
            await handleGetMethod(routeParam, splitUrl[2]);
          } else {
            await handleUpdateMethod(routeParam, splitUrl[2]);
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        const data = await ethController[routeParam.function](
          ...Object.values(routeParam.params)
        );
        if (httpMethod === 'GET') {
          console.log(data);
        }
      }
    }
  }
};

const streamingChain = async (req: any, res: any, next: NextFunction) => {
  const routesParams: MethodType[] = [
    {
      router: 'rotaDeTeste',
      function: 'balanceOf',
      params: {
        contract: '0x85DcD20D16E623648b3Cf38ab22153ba6Ad6696c',
        time: 12,
      },
    },
    {
      router: 'searchInfoContract',
      function: 'getInfoVideo',
      columnName: 'contractAddress',
      params: {},
    },
    {
      router: 'updateInfoVideo',
      function: 'updateInfo',
      columnName: 'identifier',
      params: { assistedTime: req.body.assistedTime },
    },
    {
      router: 'viewAccountsTransfer',
      function: 'viewAccountsTransfer',
      columnName: 'contractAddress',
      params: {},
    },
    {
      router: 'addTransfer',
      function: 'addTransfer',
      columnName: 'contractAddress',
      params: {
        accountAddres: req.body.accountAddress,
        percent: req.body.percent,
      },
    },
    {
      router: 'removeTransfer',
      function: 'removeTransfer',
      columnName: 'contractAddress',
      params: {
        accountAddres: req.body.accountAddress,
      },
    },
  ];
  try {
    await handlerRoutes(req.url, req.method, routesParams);
  } catch (error) {
    console.log(error);
  } finally {
    next();
  }
};

module.exports = streamingChain;
