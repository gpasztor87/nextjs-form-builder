"use server";

import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs";
import { formSchema, formSchemaType } from "@/schemas/form";

class UserNotFoundError extends Error {}

export async function getFormStats() {
  const user = await currentUser();
  if (!user) {
    throw new UserNotFoundError();
  }

  const stats = await prisma.form.aggregate({
    where: {
      userId: user.id
    },
    _sum: {
      visits: true,
      submissions: true
    }
  });

  const visits = stats._sum.visits || 0;
  const submissions = stats._sum.submissions || 0;

  let submissionRate = 0;
  let bounceRate = 0;

  if (visits > 0) {
    submissionRate = (submissions / visits) * 100;
    bounceRate = 100 - submissionRate;
  }

  return {
    visits, submissions, submissionRate, bounceRate
  };
}

export async function createForm(data: formSchemaType) {
  const validation = formSchema.safeParse(data);

  if (!validation.success) {
    throw new Error("form not valid");
  }

  const user = await currentUser();
  if (!user) {
    throw new UserNotFoundError();
  }

  const { name, description } = data;

  const form = await prisma.form.create({
    data: {
      userId: user.id,
      name,
      description
    }
  });

  if (!form) {
    throw new Error("something went wrong");
  }

  return form.id;
}

export async function getForms() {
  const user = await currentUser();
  if (!user) {
    throw new UserNotFoundError();
  }

  return await prisma.form.findMany({
    where: {
      userId: user.id
    },
    orderBy: {
      createdAt: "desc"
    }
  });
}

export async function getFormById(id: number) {
  const user = await currentUser();
  if (!user) {
    throw new UserNotFoundError();
  }

  return await prisma.form.findUnique({
    where: {
      userId: user.id,
      id
    }
  });
}

export async function getFormWithSubmissions(id: number) {
  const user = await currentUser();
  if (!user) {
    throw new UserNotFoundError();
  }

  return await prisma.form.findUnique({
    where: {
      userId: user.id,
      id
    },
    include: {
      FormSubmissions: true
    }
  });
}

export async function getFormContentByUrl(shareUrl: string) {
  return await prisma.form.update({
    select: {
      content: true,
    },
    data: {
      visits: {
        increment: 1,
      },
    },
    where: {
      shareUrl
    },
  });
}

export async function updateFormContent(id: number, content: string) {
  const user = await currentUser();
  if (!user) {
    throw new UserNotFoundError();
  }

  return await prisma.form.update({
    where: {
      userId: user.id,
      id
    },
    data: {
      content
    }
  });
}

export async function publishForm(id: number) {
  const user = await currentUser();
  if (!user) {
    throw new UserNotFoundError();
  }

  return await prisma.form.update({
    where: {
      userId: user.id,
      id
    },
    data: {
      published: true
    }
  });
}

export async function submitForm(shareUrl: string, content: string) {
  return await prisma.form.update({
    data: {
      submissions: {
        increment: 1
      },
      FormSubmissions: {
        create: {
          content
        }
      }
    },
    where: {
      shareUrl,
      published: true
    }
  });
}
