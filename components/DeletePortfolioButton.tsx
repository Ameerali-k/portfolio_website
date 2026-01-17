"use client";

import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ConfirmModal from "./ConfirmModal";

export default function DeletePortfolioButton({ id }: { id: string }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const handleDelete = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/portfolio/${id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                setShowModal(false);
                router.refresh();
            } else {
                alert("Failed to delete item");
            }
        } catch (error) {
            console.error("Delete error:", error);
            alert("Error deleting item");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <button
                onClick={() => setShowModal(true)}
                disabled={loading}
                className="p-2 hover:text-red-500 transition-colors disabled:opacity-50"
                title="Delete"
            >
                <Trash2 size={18} />
            </button>

            <ConfirmModal
                isOpen={showModal}
                title="Delete Project?"
                message="Are you sure you want to delete this project? This action cannot be undone."
                onConfirm={handleDelete}
                onCancel={() => setShowModal(false)}
                loading={loading}
            />
        </>
    );
}
