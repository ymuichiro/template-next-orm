import { type oas } from '@/services/InitOpenAPI';
import { prisma } from '@/services/InitPrisma';
import { Logger } from '@/services/Logger';
import type { NextApiRequest, NextApiResponse } from 'next/types';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  try {
    Logger.debug('access', req);
    if (req.method === 'GET') {
      return GET(req, res);
    }
    return res.status(405).end();
  } catch (err) {
    Logger.error('Internal Error', req, err);
    return res.status(500).end();
  }
}

/**
 * @description GET:/api/user get users list
 */
async function GET(_: NextApiRequest, res: NextApiResponse<oas.GetUsersResponseInner>) {
  const take = 20;

  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      image: true,
    },
    take,
  });

  const data: oas.GetUsersResponseInner['data'] = [];

  for (const user of users) {
    data.push({
      id: user.id,
      name: user.name ?? undefined,
      image: user.image ?? undefined,
    });
  }

  return res.status(200).json({ data });
}
