import PropTypes from "prop-types";
import { Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";

const PrestasiCard = ({ achievement }) => {
  const [showModal, setShowModal] = useState(false);
  const tags = achievement.tags || [];

  const displayedTags = tags.slice(0, 3);
  const remainingTagsCount = tags.length - displayedTags.length;

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showModal]);

  return (
    <>
      <div className="bg-white shadow-md rounded-xl overflow-hidden relative">
        {/* Gambar dan Overlay Nama + Judul */}
        <div className="relative">
          <img
            src={achievement.image}
            alt={achievement.students.full_name}
            className="w-full h-48 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex flex-col justify-end  text-white p-4">
            <h3 className="text-xl text-center font-bold">
              {achievement.students?.full_name}
            </h3>
            <p className="text-sm mt-1 text-center">{achievement.title}</p>
          </div>
        </div>

        {/* Bawah Card */}
        <div className="p-4 flex justify-between items-start">
          {/* Tanggal */}
          <div className="text-sm text-gray-600">
            <p className="font-medium">Tanggal:</p>
            <p>
              {new Date(achievement.date).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>

          {/* Tags */}
          <div className="flex-1 px-4">
            <p className="font-medium text-blue-800 text-sm mb-1">Tags:</p>
            <div className="flex flex-wrap gap-2">
              {displayedTags.map((tag) => (
                <span
                  key={tag.id}
                  className="border border-blue-700  text-blue-800 text-xs px-2 py-1 rounded-full"
                >
                  {tag.tag_details?.tag}
                </span>
              ))}
              {remainingTagsCount > 0 && (
                <span
                  className="text-sm text-blue-700 cursor-pointer"
                  onClick={() => setShowModal(true)}
                >
                  +{remainingTagsCount} more
                </span>
              )}
            </div>
          </div>

          {/* Tombol Detail */}
          <div>
            <img
              src="/image/arrow-detail.png"
              alt="Lihat Detail"
              className="w-10 h-10 cursor-pointer"
              onClick={() => setShowModal(true)}
            />
          </div>
        </div>
      </div>

      {/* Modal Detail Prestasi */}
      {showModal && (
        <div className="fixed inset-0 bg-gradient-to-t from-black/50 to-transparent backdrop-blur-xs flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-xl w-full p-6 relative">
            <button
              className="absolute top-2 right-3 text-gray-600 text-4xl p-2 hover:text-black"
              onClick={() => setShowModal(false)}
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-3">{achievement.title}</h2>
            <img
              src={achievement.image || "/public/image/default-image.jpg"}
              alt={achievement.title}
              className="w-full h-55 object-cover rounded mb-3"
            />
            <p>
              <strong>Nama:</strong> {achievement.students?.full_name}
            </p>
            <p>
              <strong>Kelas:</strong>{" "}
              {achievement.students?.class_name?.replace("grade_", "")}
            </p>
            <p>
              <strong>Tahun lulus:</strong>{" "}
              {achievement.students?.graduation_year}
            </p>
            <p>
              <strong>Kategori:</strong>{" "}
              {achievement.category_type === "Academic"
                ? "Akademik"
                : achievement.category_type === "Non_Academic"
                  ? "Non-Akademik"
                  : achievement.category_type}
            </p>
            <p>
              <strong>Penyelenggara:</strong> {achievement.organizer_name}
            </p>
            <p>
              <strong>Tanggal:</strong>{" "}
              {new Date(achievement.date).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
            <p>
              <strong>Point:</strong> {achievement.points}
            </p>
            <p>
              <strong>Grade:</strong> {achievement.grade}
            </p>
            <p className="mt-2 font-semibold">Tags:</p>
            <div className="flex flex-wrap gap-2 mt-1">
              {tags.map((tag) => (
                <span
                  key={tag.id}
                  className="border border-blue-700  text-blue-800 text-xs px-2 py-1 rounded-full"
                >
                  {tag.tag_details?.tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

PrestasiCard.propTypes = {
  achievement: PropTypes.shape({
    image: PropTypes.string,
    title: PropTypes.string,
    date: PropTypes.string,
    category_type: PropTypes.string,
    organizer_name: PropTypes.string,
    points: PropTypes.number,
    grade: PropTypes.string,
    students: PropTypes.shape({
      full_name: PropTypes.string,
    }),
    tags: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        tag_details: PropTypes.shape({
          tag_name: PropTypes.string,
        }),
      })
    ),
  }).isRequired,
};

export default PrestasiCard;
 