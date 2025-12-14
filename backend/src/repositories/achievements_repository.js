const { PrismaClient } = require("@prisma/client");
const JSONBigInt = require("json-bigint");

const prisma = new PrismaClient();

// const getAchievementsRepo = async ({
//   full_name,
//   grade,
//   tag,
//   title,
//   category_type,
//   organizer_name,
// }) => {
//   let query = {
//     include: {
//       students: true,
//       tags: {
//         include: {
//           tag_details: true,
//         },
//       },
//     },
//     orderBy: {
//       id: "asc",
//     },
//     where: {},
//   };

//   if (full_name) {
//     query.where.students = {
//       full_name: {
//         contains: full_name,
//         mode: "insensitive",
//       },
//     };
//   }

//   if (grade) {
//     query.where.grade = {
//       equals: grade,
//     };
//   }

//   if (tag) {
//     query.where.tags = {
//       some: {
//         tag_details: {
//           tag: {
//             contains: tag,
//             mode: "insensitive",
//           },
//         },
//       },
//     };
//   }

//   if (title) {
//     query.where.title = {
//       contains: title,
//       mode: "insensitive",
//     };
//   }

//   if (category_type) {
//     query.where.category_type = {
//       equals: category_type,
//     };
//   }

//   if (organizer_name) {
//     query.where.organizer_name = {
//       contains: organizer_name,
//       mode: "insensitive",
//     };
//   }

//   const searchedAchievements = await prisma.achievements.findMany(query);

//   const serializedAchievements = JSONBigInt.stringify(searchedAchievements);
//   return JSONBigInt.parse(serializedAchievements);
// };

const getAchievementsRepo = async (
  full_name,
  grade,
  tag,
  title,
  category_type,
  organizer_name,
) => {
  const where = {};

  if (full_name) {
    where.students = {
      full_name: {
        contains: full_name,
        mode: "insensitive",
      },
    };
  }

  if (grade) {
    where.grade = {
      equals: grade,
    };
  }

  if (tag) {
    where.tags = {
      some: {
        tag_details: {
          tag: {
            contains: tag,
            mode: "insensitive",
          },
        },
      },
    };
  }

  if (title) {
    where.title = {
      contains: title,
      mode: "insensitive",
    };
  }

  if (category_type) {
    where.category_type = {
      equals: category_type,
    };
  }

  if (organizer_name) {
    where.organizer_name = {
      contains: organizer_name,
      mode: "insensitive",
    };
  }

  const searchedAchievements = await prisma.achievements.findMany({
    where,
    include: {
      students: true,
      tags: {
        include: {
          tag_details: true,
        },
      },
    },
    orderBy: {
      id: "asc",
    },
  });

  const serializedAchievements = JSONBigInt.stringify(searchedAchievements);
  return JSONBigInt.parse(serializedAchievements);
};

const getAchievementByIdRepo = async (id) => {
  const achievement = await prisma.achievements.findFirst({
    where: {
      id: id,
    },
    include: {
      students: true,
      tags: {
        include: {
          tag_details: true,
        },
      },
    },
    orderBy: {
      id: "asc",
    },
  });
  const serializedAchievements = JSONBigInt.stringify(achievement);
  return JSONBigInt.parse(serializedAchievements);
};

const createAchievementRepo = async (
  student_id,
  title,
  organizer_name,
  image,
  date,
  points,
  grade,
  category_type
) => {
  const newAchievement = await prisma.achievements.create({
    data: {
      student_id,
      title,
      organizer_name,
      image,
      date,
      points,
      grade,
      category_type,
    },
    include: {
      tags: {
        include: {
          tag_details: true,
        },
      },
    },
  });

  const serializedAchievement = JSONBigInt.stringify(newAchievement);
  return JSONBigInt.parse(serializedAchievement);
};

const updateAchievementRepo = async (
  id,
  student_id,
  title,
  organizer_name,
  image,
  date,
  points,
  grade,
  category_type
) => {
  const updatedAchievement = await prisma.achievements.update({
    where: { id },
    data: {
      student_id,
      title,
      organizer_name,
      image,
      date,
      points,
      grade,
      category_type,
    },
  });

  const serializedAchievements = JSONBigInt.stringify(updatedAchievement);
  return JSONBigInt.parse(serializedAchievements);
};

const deleteAchievementRepo = async (id) => {
  const deletedAchievement = await prisma.achievements.delete({
    where: { id },
  });

  const serializedAchievement = JSONBigInt.stringify(deletedAchievement);
  return JSONBigInt.parse(serializedAchievement);
};

module.exports = {
  getAchievementsRepo,
  getAchievementByIdRepo,
  createAchievementRepo,
  updateAchievementRepo,
  deleteAchievementRepo,
};
